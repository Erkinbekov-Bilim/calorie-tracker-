import axiosAPI from '../../api/axiosAPI';
import MealCard from '../../components/Meal/MealCard';
import useGetMealsData from '../../hooks/useGetMealsData';
import Loading from '../../UI/Loading/Loading';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loading, error, mealsData, updateData } = useGetMealsData();

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
          mealsData.map((mealData) => <MealCard mealData={mealData} onDeleteMeal={onDeleteMeal} />)}
      </>
    );
  } else if (!loading && mealsData.length === 0 && error.message !== '') {
    render = <div className="centered-block">{error.message}</div>;
  } else if (!loading && mealsData.length === 0 && error.message === '') {
    render = <div className="centered-block">No meals</div>;
  }

  return (
    <div className="meals">
      <div className="route-link">
        <Link to={'meals/new'}>add new meal</Link>
      </div>

      <div className="meals-block">{render}</div>
    </div>
  );
};

export default Home;
