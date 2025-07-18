import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const ProtectedLanding = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    return isLoggedIn ? (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 space-y-6 text-center max-w-md w-full">
                <h2 className="text-2xl font-bold text-purple-700">Welcome, Admin</h2>
                <p className="text-gray-600">Choose where you want to go:</p>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/admin/project')}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
                    >
                        Go to Projects Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/blog')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Go to Blog Dashboard
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    );
};

export default ProtectedLanding;