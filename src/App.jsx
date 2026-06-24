import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// Admin Imports
import SignIn from './Dashboard/Sign in/Sign in.jsx';
import CreateAccount from './Dashboard/CreateAccount/CreateAccount.jsx';
import Dashboard from './Dashboard/DashboardView/Dashboard'; 
import EmergencyUnits from './Dashboard/EmergencyUnits/EmergencyUnits.jsx'; 
import AddUnit from './Dashboard/AddUnit/AddUnit.jsx'; 
import ProfileSetting from './Dashboard/Settings/ProfileSetting.jsx'; 
import AdminManagement from './Dashboard/AdminManagement/AdminManagement.jsx'; 
import SystemSettings from './Dashboard/SystemSettings/SystemSettings.jsx'; 
import CreateRole from './Dashboard/CreateRole/CreateRole.jsx'; 

// --- Dashboard Unit Imports ---
import UnitSignIn from './DashboardUnit/UnitSignIn/UnitSignIn.jsx';
import UnitDashboard from './DashboardUnit/UnitDashboardView/UnitDashboardView.jsx'; 

// --- استيرادات صفحات تفاصيل البلاغ الجديدة ---
import UnitIncidentDetail from './DashboardUnit/UnitIncidentDetail/UnitIncidentDetail.jsx';
// الزيادة هنا: استيراد ملف التايم لاين الجديد
// import TimeLine from './DashboardUnit/TimeLine/TimeLine.jsx'; 

// import IoTAlerts from './DashboardUnit/IoTAlerts/IoTAlerts.jsx';
// import DispatchPage from './DashboardUnit/DispatchPage/DispatchPage.jsx';

// // --- الزيادة هنا: استيراد صفحة الإشعارات الجديدة ---
// import UnitNotifications from './DashboardUnit/UnitNotifications/UnitNotifications.jsx'; 
import UnitSettings from './DashboardUnit/UnitSettings/UnitSettings.jsx';
import ProfilePage from './DashboardUnit/ProfilePage/ProfilePage.jsx';
import './App.css';

function App() {
  // 1. حالة الإدمن (Admin State)
  const [adminUser, setAdminUser] = useState({
    firstName: localStorage.getItem('adminFirstName') || localStorage.getItem('adminName') || "Admin",
    lastName: localStorage.getItem('adminLastName') || "User",
    email: localStorage.getItem('adminEmail') || "admin@smartcity.com",
    phoneNumber: localStorage.getItem('adminPhone') || "+1 (555) 123-4567",
    role: "System Admin",
    bio: localStorage.getItem('adminBio') || "",
    profileImage: localStorage.getItem('adminImage') || null, 
    sessions: [
      { id: 1, device: "Windows PC - Chrome", location: "Egypt", time: "Active Now", current: true },
    ]
  });

  // 2. حالة الوحدات (Units State)
  const [units, setUnits] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('unitsCache') || '[]');
      return Array.isArray(cached) ? cached : [];
    } catch {
      return [];
    }
  });
  const [loadingUnits, setLoadingUnits] = useState(true); // تأكدنا من تعريفها هنا قبل استخدامها

  const normalizeUnitsResponse = (data) => {
    // API response shape differs sometimes; try to extract the array safely.
    const looksLikeUnitsArray = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return false;
      const sample = arr.find((x) => x && typeof x === 'object');
      if (!sample) return false;
      return (
        ('name' in sample && (('id' in sample) || ('unitId' in sample))) ||
        ('id' in sample && 'type' in sample) ||
        ('unitId' in sample && 'name' in sample)
      );
    };

    const directCandidates = [
      data,
      data?.data,
      data?.data?.data,
      data?.data?.items,
      data?.data?.result,
      data?.result,
      data?.items,
      data?.responseUnits,
      data?.responseUnits?.data,
      data?.data?.responseUnits,
      data?.data?.responseUnits?.data,
    ];

    for (const c of directCandidates) {
      if (looksLikeUnitsArray(c)) return c;
      if (Array.isArray(c)) {
        // If it's an empty array, keep it as a fallback (but don't cache it blindly).
        if (c.length === 0) continue;
      }
    }

    // Last resort: search nested objects for an array that looks like units.
    const visited = new Set();
    const stack = [{ value: data, depth: 0 }];
    const maxDepth = 8;

    while (stack.length) {
      const { value, depth } = stack.pop();
      if (!value || typeof value !== 'object') continue;
      if (visited.has(value)) continue;
      visited.add(value);

      if (Array.isArray(value)) {
        if (looksLikeUnitsArray(value)) return value;
        continue;
      }

      if (depth >= maxDepth) continue;

      for (const key of Object.keys(value)) {
        const next = value[key];
        if (next && typeof next === 'object') {
          stack.push({ value: next, depth: depth + 1 });
        }
        if (Array.isArray(next) && looksLikeUnitsArray(next)) return next;
      }
    }

    return [];
  };

  // 3. دالة جلب الوحدات (للأدمن فقط)
  const fetchUnits = async () => {
    const token = localStorage.getItem('adminToken');
    
    // شرط أمان: لو مفيش توكن، أو لو إحنا في صفحات الوحدة، متنفذش الطلب عشان الـ 403
    const isUnitPath = window.location.pathname.startsWith('/unit');
    if (!token || isUnitPath) {
      setLoadingUnits(false);
      return;
    }

    // ✅ الإصلاح 1: نحتفظ بنسخة من الـ cache كـ fallback لو السيرفر فشل
    const cachedUnits = (() => {
      try {
        const cached = JSON.parse(localStorage.getItem('unitsCache') || '[]');
        return Array.isArray(cached) ? cached : [];
      } catch {
        return [];
      }
    })();

    // ✅ الإصلاح 2: نمسح الـ cache القديم عشان لو السيرفر رجع بيانات جديدة مش نرجع للـ stale cache
    localStorage.removeItem('unitsCache');

    try {
      setLoadingUnits(true);
      const URL = 'http://sm-api2.runasp.net/api/admin/response-units/List';

      // ✅ الإصلاح 3: Retry مع delay بين المحاولات عشان السيرفر يخلص يكتب الداتا الجديدة
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt > 0) {
          // استنى 800ms قبل المحاولة التانية
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        const response = await axios.get(URL, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
            // ✅ الإصلاح 4: نمنع أي HTTP cache يخلينا ناخد نسخة قديمة من السيرفر
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          // ✅ الإصلاح 5: timestamp في الـ params يكسر أي browser/proxy cache
          params: { _t: Date.now() }
        });

        const normalized = normalizeUnitsResponse(response.data);
        if (Array.isArray(normalized) && normalized.length > 0) {
          setUnits(normalized);
          localStorage.setItem('unitsCache', JSON.stringify(normalized));
          return;
        }

        // لو السيرفر رجع فاضي في المحاولة الأخيرة — السيرفر فاضي فعلاً
        if (attempt === 1) {
          setUnits([]);
          localStorage.setItem('unitsCache', JSON.stringify([]));
        }
      }
    } catch (error) {
      // لو جاب 403 معناها التوكن مش بتاع أدمن، مش محتاجين نطلع Error
      console.error("FetchUnits Error:", error);
      // ✅ الإصلاح 6: لو السيرفر فشل نرجع للـ cache القديم
      if (cachedUnits.length > 0) setUnits(cachedUnits);
    } finally {
      setLoadingUnits(false);
    }
  };

  // 4. الـ Effect الرئيسي
  useEffect(() => {
    const isUnitLogin = window.location.pathname === '/unit/login';
    const isMainLogin = window.location.pathname === '/';

    // نطلب البيانات فقط لو مش في صفحات تسجيل الدخول
    if (!isUnitLogin && !isMainLogin) {
      fetchUnits();
    }
  }, []);

  const updateAdmin = (newData) => {
    setAdminUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('adminFirstName', updated.firstName);
      localStorage.setItem('adminEmail', updated.email);
      return updated;
    });
  };

  const revokeSession = (sessionId) => {
    setAdminUser(prev => ({
      ...prev,
      sessions: prev.sessions.filter(s => s.id !== sessionId)
    }));
  };

  // --- دالة الحذف النهائية ---
  const deleteUnit = async (id) => {
    const token = localStorage.getItem('adminToken');
    const targetUnit = units.find(u => u.id === id);

    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: `سيتم حذف ${targetUnit?.name || 'الوحدة'} نهائياً!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'نعم، احذف!',
      cancelButtonText: 'إلغاء'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(`http://sm-api2.runasp.net/api/admin/response-units/Delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.succeeded || response.status === 200) {
        setUnits(prev => prev.filter(u => u.id !== id));
        Swal.fire('تم الحذف!', 'تمت إزالة الوحدة من النظام.', 'success');
        return;
      }
    } catch (error) {
      console.warn("المسار الأول فشل، نجرب مسار AppUser...");
    }

    try {
      const response = await axios.delete(`http://sm-api2.runasp.net/api/AppUser/Delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setUnits(prev => prev.filter(u => u.id !== id));
      Swal.fire('تم الحذف!', 'تمت إزالة السجل بنجاح.', 'success');

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUnits(prev => prev.filter(u => u.id !== id));
        Swal.fire('تحديث', 'لم يتم العثور على العنصر في السيرفر، تم تحديث الواجهة.', 'info');
      } else {
        Swal.fire('خطأ', 'فشلت عملية الحذف، تأكد من اتصالك بالسيرفر.', 'error');
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Admin Routes --- */}
        <Route path="/" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard units={units} admin={adminUser} />} />
        <Route path="/units" element={<EmergencyUnits units={units} onDelete={deleteUnit} admin={adminUser} />} />
        <Route path="/add-unit" element={<AddUnit onAdd={fetchUnits} admin={adminUser} />} />
        <Route path="/admin-management" element={<AdminManagement admin={adminUser} />} />
        <Route path="/create-role" element={<CreateRole admin={adminUser} />} />
        <Route path="/settings" element={<SystemSettings admin={adminUser} />} />
        <Route path="/profile" element={<ProfileSetting admin={adminUser} onUpdate={updateAdmin} onRevoke={revokeSession} />} />

        {/* --- Dashboard Unit Routes --- */}
        <Route path="/unit/login" element={<UnitSignIn />} />
        <Route path="/unit/dashboard" element={<UnitDashboard />} />
        <Route path="/unit/incident-detail" element={<UnitIncidentDetail />} />
        <Route path="/unit/incident-detail/:id" element={<UnitIncidentDetail />} />
        {/* <Route path="/unit/timeline" element={<TimeLine />} />
        <Route path="/unit/iot-alerts" element={<IoTAlerts />} />
        <Route path="/unit/dispatch" element={<DispatchPage />} />
        <Route path="/unit/notifications" element={<UnitNotifications />} /> */}
        <Route path="/unit/settings" element={<UnitSettings />} />
        <Route path="/unit/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;