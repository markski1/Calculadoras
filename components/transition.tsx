import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  out: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.33
    }
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.33
    }
  }
};


const Transition = ({ children }) => {
  const { asPath } = useRouter();

  return (
		<div className="efectoTransicion">
			<AnimatePresence
	      mode='wait'
	    >
	      <motion.div variants={variants}
          key={asPath}
          animate="in"
          initial="out"
          exit="out">
	        {children}
	      </motion.div>
	    </AnimatePresence>
		</div>
	);
};

export default Transition;