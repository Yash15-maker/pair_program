import React from "react";
import { db } from "../db";

async function page() {
  const items = await db.query.testingSchema.findMany();
  const rooms = await db.query.room.findMany();
  return (
    <div>
      {items.map((item) => {
        return <div>{item.name}</div>;
      })}
      {rooms.map((room) => {
        return (
          <div key={room.id}>
            <span>{room.description}</span>
          </div>
        );
      })}
    </div>
  );
}

export default page;
