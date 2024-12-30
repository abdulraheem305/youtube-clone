import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCategory,
  selectActiveCategory,
} from "../../redux/slice/videoSlice";


const YouTubeSlider = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectActiveCategory);
  
  

  const categories = [
    "All",
    "Coding",
    "Programming",
    "JavaScript",
    "Web Development",
    "Python",
    "React",
    "CSS",
    "SQL",
    "DevOps",
    "Docker",
    "Containers",
    "APIs",
    "Data",
    "Design",
    "Tips",
  ];

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div>
      <div className="fixed top-14 w-full bg-white z-40">
      <div className="flex items-center overflow-x-auto scrollbar-hide space-x-4 px-4 py-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-sm font-semibold px-3 py-1 rounded-[10px] ${
                activeCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-lightGray text-lightgray border-gray-300"
              } ${activeCategory !== category ? "hover:bg-gray" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeSlider;
