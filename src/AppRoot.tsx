import { RouterProvider } from "react-router-dom";
import { rootRouter } from "@/routes";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/pt-br' 

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

function AppRoot() {
  return <RouterProvider router={rootRouter} />;
}

export default AppRoot;
