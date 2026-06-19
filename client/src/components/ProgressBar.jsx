import { motion } from "framer-motion";

function ProgressBar({ step }) {

  const percent = (step / 5) * 100;

  return (

    <div className="w-full mb-8">

      <div className="bg-gray-200 rounded-full h-3">

        <motion.div
          className="bg-yellow-500 h-3 rounded-full"
          animate={{
            width: `${percent}%`
          }}
          transition={{
            duration:0.5
          }}
        />

      </div>

      <p className="text-center mt-2">
        Step {step} of 5
      </p>

    </div>
  );
}

export default ProgressBar;