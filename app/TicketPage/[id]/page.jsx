import { useEffect, useState } from 'react';
import EditTicketForm from "@/app/(components)/EditTicketForm";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`https://ticketingapp253.vercel.app/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = ({ params }) => {
  const [updateTicketData, setUpdateTicketData] = useState(null);
  const EDITMODE = params.id === "new" ? false : true;

  useEffect(() => {
    if (EDITMODE) {
      getTicketById(params.id).then(data => {
        setUpdateTicketData(data.foundTicket);
      });
    }
  }, [params.id]);

  // Render the EditTicketForm component with the fetched data
  return (
    <div>
      {updateTicketData && <EditTicketForm data={updateTicketData} />}
    </div>
  );
};

export default TicketPage;