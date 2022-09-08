import rateLimit from 'express-rate-limit';

// limite le nombre de requête
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false, 
})
export default limiter