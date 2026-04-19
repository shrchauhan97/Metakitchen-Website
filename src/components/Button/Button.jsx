import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Button.css'

const motionProps = {
  whileHover: { y: -2, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
}

export default function Button({ children, variant = 'primary', size = 'md', to, href, onClick, className = '', type, ...props }) {
  const classes = `btn btn--${variant} btn--${size} ${className}`

  if (to) return (
    <motion.div {...motionProps} style={{ display: 'inline-block' }}>
      <Link to={to} className={classes} {...props}>{children}</Link>
    </motion.div>
  )

  if (href) return (
    <motion.div {...motionProps} style={{ display: 'inline-block' }}>
      <a href={href} className={classes} {...props}>{children}</a>
    </motion.div>
  )

  return (
    <motion.button className={classes} onClick={onClick} type={type} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}
