import {Route, Router as SolidRouter} from "@solidjs/router";

import {Home} from "./routes/Home.jsx";
import {Privacy} from "./routes/Privacy.jsx";
import {Terms} from "./routes/Terms.jsx";
import {Layout} from "./routes/Layout.jsx";
import {Contact} from "./routes/Contact.jsx";

export const Router = () => {
    return (
        <Layout>
            <SolidRouter>
                <Route path="/" component={Home}/>
                <Route path="/privacy" component={Privacy}/>
                <Route path="/terms" component={Terms}/>
                <Route path="/contact" component={Contact}/>
            </SolidRouter>
        </Layout>

    )
}