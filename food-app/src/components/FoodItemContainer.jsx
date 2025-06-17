import React from 'react'
import FoodItem from './FoodItem'

const FoodItemContainer = ({category}) => {

    const dishes =[
        {menu:'salad', name:'Arugula Salad', img: '/dishes/salad/Arugula-salad.jpg'},
        {menu:'salad', name:'Beet Salad', img: '/dishes/salad/beet-salad.jpg'},
        {menu:'salad', name:'Caesar Salad', img: '/dishes/salad/caesar-salad.jpg'},
        {menu:'salad', name:'Fruit Salad', img: '/dishes/salad/Fruit Salad.webp'},
        {menu:'salad', name:'Green Salad', img: '/dishes/salad/green-salad.jpg'},
        {menu:'salad', name:'Italian Chopped Salad', img: '/dishes/salad/italian-chopped-salad.jpg'},
        {menu:'salad', name:'Simple Green Salad', img: '/dishes/salad/simple-green-salad.jpg'},
        {menu:'salad', name:'Torellini Salad', img: '/dishes/salad/torellini-salad.jpg'},

        {menu:'rolls', name:'Buffalo Chicken Wrap', img: '/dishes/rolls/buffalo-chicken-wrap.avif'},
        {menu:'rolls', name:'Cabbage Wrapped Brats', img:'/dishes/rolls/cabbage-wrapped-brats.avif'},
        {menu:'rolls', name:'Chicken Caesar Wraps', img:'/dishes/rolls/chicken-caesar-wraps.avif'},
        {menu:'rolls', name:'Chicken Quesadilla', img:'/dishes/rolls/chicken-quesadilla.avif'},
        {menu:'rolls', name:'Chicken Shawarma', img:'/dishes/rolls/chicken-shawarma.avif'},
        {menu:'rolls', name:'Collard Wrap Burritos', img:'/dishes/rolls/collard-wrap-burritos.avif'},

        {menu:'pasta', name:'Angel Hair Pasta', img:'/dishes/pasta/angel-hair-pasta.webp'},
        {menu:'pasta', name:'Bow Tie Pasta', img:'/dishes/pasta/Bow-tie-pasta.webp'},
        {menu:'pasta', name:'Bucatini Pasta', img:'/dishes/pasta/Bucatini-pasta.webp'},
        {menu:'pasta', name:'Ditalini Pasta', img:'/dishes/pasta/Ditalini-pasta.webp'},

        {menu:'desserts', name:'Blueberry Grunt', img:'/dishes/desserts/blueberry-grunt.jpg'},
        {menu:'desserts', name:'Caramel Corn', img:'/dishes/desserts/caramel-corn.jpg'},
        {menu:'desserts', name:'Chocolate Fudge', img:'/dishes/desserts/chocolate-fudge.jpg'},

        {menu:'noodles', name:'Hakka Noodles', img:'/dishes/noodles/hakka-noodles.webp'},
        {menu:'noodles', name:'Ramen', img:'/dishes/noodles/Ramen.webp'},
        {menu:'noodles', name:'Schezwan Noodles', img:'/dishes/noodles/schezwan.webp'},

        {menu:'sandwiches', name:'Cuban Sandwich', img:'/dishes/sandwiches/cuban-sandwiches.webp'},
        {menu:'sandwiches', name:'Elvis Sandwich', img:'/dishes/sandwiches/Elvis-sandwich.webp'},
        {menu:'sandwiches', name:'Monte Cristo Sandwich', img:'/dishes/sandwiches/monte-cristo-sandwich.webp'},
        {menu:'sandwiches', name:'Panuozzo Sandwich', img:'/dishes/sandwiches/Panuozzo-sandwich.webp'},
        {menu:'sandwiches', name:'Reuben Sandwich', img:'/dishes/sandwiches/Reuben-sandwich.webp'}

    ]

  return (
    <>
        <hr className='border-t-6 border-lime-600 rounded-full border-dashed mx-8 sm:mx-32 mt-12'/>
        <h1 className='mx-8 sm:mx-32 my-6 text-3xl font-bold'>Top dishes near you</h1>
        <div className='mx-8 sm:mx-32 flex flex-wrap'>
          {
            category===null?(
              dishes.map((dish)=>{
                return(
                  <FoodItem dish={dish}/>
                )
              })
            ) : (
              dishes.filter(dish=>dish.menu===category).map((dish)=>{
                return(
                  <FoodItem dish={dish}/>
                )
              })
            )
          }
        </div>
    </>
  )
}

export default FoodItemContainer