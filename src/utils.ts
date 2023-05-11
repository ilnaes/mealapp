interface Meal {
  user: string;
  ts_meal: string;
  note?: string;
  tags?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clean(user: string, json: any, options = true): Meal | null {
  // check if necessary fields are present and correct type
  for (const f of ["meal", "ts"]) {
    if (!(f in json) || typeof json[f] !== "string") {
      return null;
    }
  }

  // checks date is properly formatted
  const ts = json["ts"];
  if (ts.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) === null) {
    return null;
  }
  const d = new Date(ts);
  if (isNaN(d.getTime())) {
    return null;
  }

  const res: Meal = {
    user,
    ts_meal: ts + "#" + json["meal"],
  };

  if (!options) {
    return res;
  }

  if ("note" in json) {
    if (typeof json["note"] === "string") {
      res["note"] = json["note"];
    } else {
      return null;
    }
  }

  // checks tags are correct length string arrays
  if ("tags" in json) {
    if (!Array.isArray(json["tags"]) || json["tags"].length > 3) {
      return null;
    }

    for (const x of json["tags"]) {
      if (typeof x !== "string") {
        return null;
      }
    }

    res["tags"] = json["tags"];
  }

  return res;
}
