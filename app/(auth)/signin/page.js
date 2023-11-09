'use client';

import Loader from '@/app/components/Loader';
import NameField from '@/app/components/form/NameField';
import PasswordField from '@/app/components/form/PasswordField';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { signInValidationSchema } from '@/app/schemas/signInValidationSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function SigninPage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { set } = useLocalStorage();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      fetch('http://localhost:3003/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: values.name, password: values.password }),
        cache: 'no-cache',
      })
        .then((resp) => resp.json())
        .then((data) => {
          set('user_data', JSON.stringify(data));
          setCurrentUser(data);
          toast.success('Login success.');

          setTimeout(() => {
            router.push('/messages');
          }, 1000);
        })
        .catch((error) => {
          console.error('Error: ', error);
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (currentUser) router.push('/messages');
  }, [currentUser]);

  return (
    <div className="grid justify-center px-4 py-8">
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body">
          <h2 className="card-title mb-4">Chityaaung</h2>
          <form onSubmit={formik.handleSubmit}>
            <motion.div
              initial={{ x: '50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <NameField
                value={formik.values.name}
                onChange={formik.handleChange}
                errorMessage={formik.touched.name && formik.errors.name}
                disabled={formik.isSubmitting}
              />
              <PasswordField
                value={formik.values.password}
                onChange={formik.handleChange}
                errorMessage={formik.touched.password && formik.errors.password}
                disabled={formik.isSubmitting}
              />
            </motion.div>
            <button
              className="btn btn-primary w-full mt-4"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Sign In
              {formik.isSubmitting && <Loader />}
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>
          <p className="text-center">OR</p>
          <button
            className="btn btn-secondary w-full mt-4"
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => router.push('/signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
