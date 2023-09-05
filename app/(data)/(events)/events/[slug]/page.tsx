
import { apiUrl } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import EventSingle from "../../../../templates/EventSingle";


async function getAllEvents() {
  const res = await fetch(apiUrl + `/events/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSingleEvent(slug: String) {
  const res = await fetch(apiUrl + `/events/all/${slug}`)
  if (!res.ok) {
    return notFound();
  } else {
    return res.json();
  }
}

export default async function Page({params: { slug } }:any) {
  const _event = getSingleEvent(slug);
  const event = await _event;

  if (!event.slug) return notFound();

  return (
    <>
      <EventSingle eventData={event} />
    </>
  );
}

export async function generateStaticParams() {
  const _events = getAllEvents();
  const events = await _events;
  return events.map((eventSing: any) => ({ 
      slug: eventSing.slug 
  }));
}