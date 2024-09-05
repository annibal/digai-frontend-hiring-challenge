import { RouterProvider } from "react-router-dom";
import { rootRouter } from "@/routes";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { StoreProvider } from "./providers/StoreProvider";
import getInterviews from "./providers/interview.provider";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

function AppRoot() {
  return (
    <StoreProvider initialQuestions={getInterviews()[0].questions}>
      <RouterProvider router={rootRouter} />;
    </StoreProvider>
  );
}

export default AppRoot;
