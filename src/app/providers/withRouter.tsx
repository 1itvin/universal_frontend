import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import LoaderElement from "../../shared/ui/loaderElement";

const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<LoaderElement />}>
        {component()}
      </Suspense>
    </BrowserRouter>
  );

export default withRouter;
