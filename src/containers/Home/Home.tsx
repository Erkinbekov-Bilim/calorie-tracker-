import { color, motion, type MotionProps } from 'motion/react';
import axiosAPI from '../../api/axiosAPI';
import MealCard from '../../components/Meal/MealCard';
import useGetMealsData from '../../hooks/useGetMealsData';
import Loading from '../../UI/Loading/Loading';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loading, error, mealsData, updateData } = useGetMealsData();

  const MotionLink = motion.create(Link);
  const animationLink: MotionProps = {
    initial: {
      color: 'var(--color-text-900)',
      backgroundColor: 'var(--color-bg-text)',
      border: '1px solid var(--color-border-button-hover)',
    },
    whileHover: {
      backgroundColor: 'var(--color-bg-button-hover)',
      border: '1px solid var(--color-border-button-hover)',
    },
  };

  let render: React.ReactNode = (
    <div className="centered-block">
      <Loading />
    </div>
  );

  const onDeleteMeal = async (id: string) => {
    try {
      await axiosAPI.delete(`meals/${id}.json`);
      updateData();
    } catch (error) {
      console.log(error);
    }
  };

  if (!loading && mealsData.length > 0 && error.message === '') {
    render = (
      <>
        {mealsData.length > 0 &&
          error.message === '' &&
          mealsData.map((mealData) => (
            <MealCard mealData={mealData} onDeleteMeal={onDeleteMeal} key={mealData.id}/>
          ))}
      </>
    );
  } else if (!loading && mealsData.length === 0 && error.message !== '') {
    render = <div className="centered-block">{error.message}</div>;
  } else if (!loading && mealsData.length === 0 && error.message === '') {
    render = <div className="centered-block">No meals</div>;
  }

  let totalKcal: number | null = null;

  if (mealsData.length > 0) {
    totalKcal = mealsData.reduce((acc, mealData) => {
      if (mealData.meal_calorie) {
        acc += mealData.meal_calorie;
      }

      return acc;
    }, 0);
  }

  return (
    <div className="meals">
      <div className="meals-top">
        <MotionLink to={'/meals/new'} {...animationLink} className="route-link">
          add new meal
        </MotionLink>

        {totalKcal && (
          <div className="meals-total-kcal">
            <p className="calories-label">Total calories</p>
            <p className="calories-total">{totalKcal} kcal</p>
          </div>
        )}
      </div>

      <div className="meals-block">{render}</div>
    </div>
  );
};

export default Home;
