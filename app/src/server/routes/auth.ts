import { Router } from 'express';

const router = Router();

// Mock users database
const users = [
  {
    id: 'u1',
    email: 'admin@split.hr',
    password: 'password123',
    fullName: 'Admin User',
    role: 'admin'
  },
  {
    id: 'u2',
    email: 'citizen@gmail.com',
    password: 'password123',
    fullName: 'Marija Horvat',
    role: 'user'
  }
];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`[AUTH] Login attempt for: ${email}`);
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    console.log(`[AUTH] Login successful for: ${email}`);
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}`
      },
      timestamp: new Date().toISOString()
    });
  } else {
    console.log(`[AUTH] Login failed for: ${email}`);
    res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_FAILED',
        message: 'Invalid email or password'
      },
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password, fullName, oib } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'EMAIL_EXISTS',
        message: 'User with this email already exists'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  const newUser = {
    id: `u${users.length + 1}`,
    email,
    password,
    fullName,
    role: 'user' as const,
    oib
  };
  
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({
    success: true,
    data: {
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}`
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
