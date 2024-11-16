export const Validate = (formData, setErrors) => {
    const newErrors = {};

    // Username validation
    if (!formData.username) newErrors.username = 'Username is required';
    
    else if (!/^[a-z_.]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain lowercase letters, underscores, and dots';
    }
    
    // Name validation
    if (!formData.name) newErrors.name = 'Name is required';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const password = formData.password;
      
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must include at least one uppercase letter';
      }
      if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must include at least one lowercase letter';
      }
      if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must include at least one number';
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = 'Password must include at least one special character';
      }
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
    
  }