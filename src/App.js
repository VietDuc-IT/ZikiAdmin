import "./App.css";
import { Switch, Route } from "react-router-dom";
import ListRecord from "./components";
import AddEdit from "./components/AddEdit";
import Error from "./components/Error";
import Header from "./components/Header";
import View from "./components/View";
import User from "./components/User";
import ViewUser from "./components/ViewUser";
import Category from "./components/Category";
import ViewCategory from "./components/ViewCategory";
import AddCate from "./components/AddCate";

function App() {
  return (
    <div className="App">
      <Header />
        <Switch>
          <Route exact path="/" component={ListRecord} />
          <Route exact path="/add" component={AddEdit} />
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/update/:id" component={AddEdit} />
          <Route exact path="/user" component={User} />
          <Route exact path="/viewUser/:id" component={ViewUser} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/viewCategory/:id" component={ViewCategory} />
          <Route exact path="/addCate" component={AddCate} />
          <Route exact path="/updateCate/:id" component={AddCate} />
          <Route path="*" component={Error} />
        </Switch>
      
      {/* </div> */}
    </div>
  );
}

export default App;
