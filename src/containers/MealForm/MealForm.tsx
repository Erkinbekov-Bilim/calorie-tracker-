import { useForm } from 'react-hook-form';
import './MealForm.css';
import Button from '../../UI/Button/Button';
import type { MotionProps } from 'motion/react';

const MealForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      meal_description: '',
      meal_calorie: '',
    },
  });

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

  return (
    <>
      <div className="form-block">
        <form>
          <div className="form-group">
            <div className="form-input-block">
              <label htmlFor="meal_time" className="form-input-label">
                Meal Calorie
              </label>
              <select
                id="meal_time"
                name="meal_time"
                title="meal time"
                className="form-select"
              >
                <option disabled selected className="form-select-option">
                  Select meal time
                </option>
                <option value="" className="form-select-option">
                  Breakfast
                </option>
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
                title="meal"
                className="form-input"
                placeholder="meal calorie"
                {...register('meal_calorie', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 1',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Maximum length should be 10',
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
              // text={isEdit ? 'Update' : 'Create'}
              motionAnimation={animation}
              text="Test"
              className="form-button"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default MealForm;
