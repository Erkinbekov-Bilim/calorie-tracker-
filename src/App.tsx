import MealForm from "./containers/MealForm/MealForm"
import Home from "./containers/Home/Home"
import NotFound from "./containers/NotFound/NotFound"
import Layout from "./Layout/Layout"
import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/meals" element={<Home/>}/>
          <Route path="/meals/new" element={<MealForm/>}/>
          <Route path="/meals/:idMeal/edit" element={<MealForm/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
