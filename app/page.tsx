import React from "react";
import { db } from "../db";

async function page() {
  const items = await db.query.testingSchema.findMany();
  return (
    <div>
      {items.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
}

export default page;
