import {App} from './src/App';
import {AppContextWrapper} from "./src/AppContextWrapper";

const MainApp = () => (
    <AppContextWrapper>
        <App/>
    </AppContextWrapper>
);

export default MainApp;