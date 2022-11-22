import { useState } from 'react';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authService';
import Card from '../card/Card';
import './ChangePassword.scss';
import { useNavigate } from 'react-router-dom';

const initialState = {
  oldPassword: '',
  password: '',
  password2: '',
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error('New Passwords Do Not Match!');
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data);
    navigate('/profile');
  };

  return (
    <div className="change-password">
      <Card cardClass={'password-card'}>
        <h3>Change Password</h3>
        <form onSubmit={changePass} className="--form-control">
          {/* OLD PASSWORD */}
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          {/* NEW PASSWORD 1 */}
          <input
            type="password"
            placeholder="New Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          {/* CONFIRM NEW PASSWORD */}
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
