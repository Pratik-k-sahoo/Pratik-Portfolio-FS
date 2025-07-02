import React from 'react'
import Header from '../../components/Header';
import AdminLoginSection from '../../components/AdminLoginSection';

const AdminLogin = () => {
	return (
		<div>
			<Header page="login" />
      <AdminLoginSection />
		</div>
	);
};

export default AdminLogin;