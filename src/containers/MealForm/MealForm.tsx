import { useForm } from 'react-hook-form';
import './MealForm.css';
import Button from '../../UI/Button/Button';
import type { MotionProps } from 'motion/react';
import type IMealMutation from '../../../types/meals/mealMutation';
import axiosAPI from '../../api/axiosAPI';
import useGetMealsData from '../../hooks/useGetMealsData';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const MealForm = () => {
  const params = useParams<{ idMeal: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMealMutation>({
    defaultValues: {
      meal_time: '',
      meal_description: '',
      meal_calorie: 0,
    },
  });

  const { error, mealsData } = useGetMealsData('meals_time.json');
  const navigate = useNavigate();

  const animation: MotionProps = {
    initial: {
      scale: 1,
      backgroundColor: 'var(--color-bg-button)',
      color: 'var(--color-text-white)',
      border: '1px solid var(--color-border-button)',
    },
    whileHover: {
      scale: 0.95,
      backgroundColor: 'var(--color-bg-button-hover)',
      color: 'var(--color-text-button-hover)',
      border: '1px solid var(--color-border-button-hover)',
    },
    whileTap: {
      scale: 0.9,
    },
  };

  let renderError: React.ReactNode | null = null;
  const getMealData = useCallback(async (id: string) => {
    try {
      const response = await axiosAPI.get<IMealMutation>(`meals/${id}.json`);
      const mealDataRes = response.data;
      reset(mealDataRes);
    } catch {
      if (isAxiosError(error)) {
        if (error.response) {
          renderError = (
            <div className="centered-block">
              <p className="error">Error {error.response.status}</p>
            </div>
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    if (params.idMeal) {
      void getMealData(params.idMeal);
    }
  }, [params.idMeal, getMealData]);

  const onSubmitMeal = async (data: IMealMutation) => {
    reset({
      meal_time: '',
      meal_description: '',
      meal_calorie: 0,
    });

    if (!params.idMeal) {
      await axiosAPI.post('meals.json', {
        ...data,
        meal_calorie: Number(data.meal_calorie),
      });
      navigate('/');
      toast.success('Meal created successfully!');
    } else if (params.idMeal) {
      toast.success('Meal updated successfully!');
      await axiosAPI.put(`meals/${params.idMeal}.json`, {
        ...data,
        meal_calorie: Number(data.meal_calorie),
      });
    }
  };

  return (
    <>
      <div className="form-block">
        {renderError}
        <form onSubmit={handleSubmit(onSubmitMeal)}>
          <div className="form-group">
            <p className="type-form">
              {params.idMeal ? 'Update meal' : 'Add new Meal'}
            </p>
            <div className="form-input-block">
              <label htmlFor="meal_time" className="form-input-label">
                Meal Calorie
              </label>
              <select
                id="meal_time"
                title="meal time"
                className="form-select"
                {...register('meal_time', {
                  required: 'This field is required',
                })}
                name="meal_time"
              >
                <option disabled className="form-select-option" value="">
                  {error.message !== '' ? error.message : 'Select meal time'}
                </option>
                {mealsData.length > 0 &&
                  error.message === '' &&
                  mealsData.map((mealData) => (
                    <option
                      value={mealData.id}
                      className="form-select-option"
                      key={mealData.id}
                    >
                      {mealData.meal_time}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-input-block">
              <label htmlFor="meal" className="form-input-label">
                Meal
              </label>
              <input
                id="meal"
                type="text"
                title="meal"
                className="form-input"
                placeholder="meal"
                {...register('meal_description', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 2',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Maximum length should be 50',
                  },
                })}
                name="meal_description"
              />
              {errors.meal_description && (
                <p className="form-error">{errors.meal_description.message}</p>
              )}
            </div>

            <div className="form-input-block">
              <label htmlFor="meal_calorie" className="form-input-label">
                Meal Calorie
              </label>
              <input
                id="meal_calorie"
                type="number"
                title="meal_calorie"
                className="form-input"
                placeholder="meal calorie"
                {...register('meal_calorie', {
                  valueAsNumber: true,
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'Minimum value should be 1',
                  },
                  max: {
                    value: 30000,
                    message: 'Maximum value should be 30000',
                  },
                })}
                name="meal_calorie"
              />
              {errors.meal_calorie && (
                <p className="form-error">{errors.meal_calorie.message}</p>
              )}
            </div>

            <Button
              type="submit"
              text={params.idMeal ? 'Update' : 'Create'}
              motionAnimation={animation}
              className="form-button"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default MealForm;
