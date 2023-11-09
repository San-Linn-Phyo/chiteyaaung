// TODO:: Fix auto submit when image file is choosen.

'use client';

import Loader from '@/app/components/Loader';
import AgeField from '@/app/components/form/AgeField';
import GenderField from '@/app/components/form/GenderField';
import ImageField from '@/app/components/form/ImageField';
import NameField from '@/app/components/form/NameField';
import PasswordField from '@/app/components/form/PasswordField';
import PhoneNumberField from '@/app/components/form/PhoneNumberField';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { signUpValidationSchema } from '@/app/schemas/signUpValidationSchema';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const { currentUser } = useContext(CurrentUserContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const delta = currentStep - previousStep;

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      password: '',
      image: '',
      age: '',
      gender: '',
    },
    validationSchema: signUpValidationSchema[currentStep],
    onSubmit: function (values, { setSubmitting }) {
      if (currentStep === 0) {
        // TODO:: Check there is an account using this phone number.
        setTimeout(() => {
          console.log('Values:', values);
          setSubmitting(false);
          increaseCurrentStep();
        }, 3000);
      } else if (currentStep === 1) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('ph_no', values.phoneNumber);
        formData.append('password', values.password);
        formData.append('age', values.age);
        formData.append('gender', values.gender);
        formData.append('image', values.image);

        fetch('http://localhost:3003/api/User/register', {
          method: 'POST',
          body: formData,
          cache: 'no-cache',
        })
          .then((resp) => resp.json())
          .then(() => {
            toast.success('Account creation success.');
            setTimeout(() => {
              router.push('/signin');
            }, 1000);
          })
          .catch((error) => {
            console.error('ERROR: ', error);
            setSubmitting(false);
          });
      }
    },
  });

  function increaseCurrentStep() {
    setCurrentStep((prev) => prev + 1);
    setPreviousStep(() => currentStep);
  }

  function decreaseCurrentStep() {
    setCurrentStep((prev) => prev - 1);
    setPreviousStep(() => currentStep);
  }

  useEffect(() => {
    if (currentUser) router.push('/messages');
  }, [currentUser]);

  return (
    <>
      <div className="grid justify-center px-4 py-8">
        <div className="card bg-base-100 shadow-xl max-w-sm mx-auto my-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Chiteyaaung</h2>
            <div className="mb-4">
              <ul className="flex justify-between gap-6">
                <li className="grid flex-grow">
                  <span className="text-sm text-secondary">Step 1</span>
                  <span>Account Detail</span>
                  <div
                    className={`h-1 rounded mt-4 ${
                      currentStep === 0 ? 'bg-primary' : 'bg-base-300'
                    }`}
                  />
                </li>
                <li className="grid flex-grow">
                  <span className="text-sm text-secondary">Step 2</span>
                  <span>Profile Detail</span>
                  <div
                    className={`h-1 rounded mt-4 ${
                      currentStep === 1 ? 'bg-primary' : 'bg-base-300'
                    }`}
                  />
                </li>
              </ul>
            </div>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <NameField
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.name && formik.errors.name}
                    disabled={formik.isSubmitting}
                  />
                  <PhoneNumberField
                    setFieldValue={formik.setFieldValue}
                    errorMessage={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    disabled={formik.isSubmitting}
                  />
                  <PasswordField
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={
                      formik.touched.password && formik.errors.password
                    }
                    disabled={formik.isSubmitting}
                  />
                </motion.div>
              )}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ImageField
                    setFieldValue={formik.setFieldValue}
                    errorMessage={formik.touched.image && formik.errors.image}
                    disabled={formik.isSubmitting}
                  />
                  <AgeField
                    setFieldValue={formik.setFieldValue}
                    errorMessage={formik.touched.age && formik.errors.age}
                    disabled={formik.isSubmitting}
                  />
                  <GenderField
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.gender && formik.errors.gender}
                    disabled={formik.isSubmitting}
                  />
                </motion.div>
              )}
              <div className="flex justify-between">
                <button
                  className={`btn btn-ghost ${currentStep === 0 && 'hidden'}`}
                  type="button"
                  onClick={() => currentStep > 0 && decreaseCurrentStep()}
                  disabled={formik.isSubmitting}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {currentStep === 1 ? 'Sign Up' : 'Next'}
                  {formik.isSubmitting && <Loader />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
