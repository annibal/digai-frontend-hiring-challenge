import { OneOrMany, someManyOrCheckOne } from "./for-one-or-for-many";
import { Class } from "./utility-types";

export default function isErrorOf(
  error: Error,
  criterion: OneOrMany<Class<Error> | ErrorConstructor | string>
): boolean {
  return someManyOrCheckOne(criterion, (comparee) => {
    if (error.name === comparee || error.name === comparee["name"]) {
      return true;
    }

    try {
      if (error instanceof (window[(comparee as string)])) {
        return true;
      }
    } catch (_e) {
      String(_e);
    }

    try {
      if (error instanceof (comparee as ErrorConstructor)) {
        return true;
      }
    } catch (_e) {
      String(_e);
    }

    const errorProtoName = Object.prototype.toString
      .call(error)
      .split(" ")[1]
      .replace("]", "");
    
    if (errorProtoName === comparee || errorProtoName === comparee["name"]) {
      return true;
    }

    return false;
  });
}
