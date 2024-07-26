import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthUserContext";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
} from "@/firebase/firestore";
import { formSchema } from "@/types/Forms";
import { Availability, UserType } from "@/types/User";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Calendar, Event, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import { z } from "zod";
import FamillyInfosForm from "./FamillyInfosForm";

const localizer = momentLocalizer(moment);

const UserIsConnected = () => {
  const { authUserInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Availability | null>(null);

  useEffect(() => {
    if (userData === null && authUserInfo) {
      const handleGetUserData = async () => {
        const result = await getDataFromFirebase("users", authUserInfo.uid);
        if (result.error) {
          console.error(result.error);
          return;
        }
        if (result.data) {
          const userData = result.data as UserType;
          setUserData(userData);
          setAvailabilities(userData.familyAvailabilities || []);
        }
      };
      handleGetUserData();
    }
  }, [authUserInfo, userData]);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setAvailabilities([...availabilities, { start, end }]);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event as Availability);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setAvailabilities(
        availabilities.filter((event) => event !== selectedEvent)
      );
      setSelectedEvent(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (authUserInfo) {
      const { error } = await addOrUpdateDataToFirebase(
        "users",
        authUserInfo.uid,
        {
          ...values,
          familyAvailabilities: availabilities,
        }
      );
      if (error) {
        setLoading(false);
        toast.error("Un problème est survenu !");
        return;
      }
      toast.success("Mise à jour réussie");
      setUserData({
        ...userData,
        ...values,
        familyAvailabilities: availabilities,
      } as unknown as UserType);
    }
    setLoading(false);
  }

  return (
    userData && (
      <>
        <FamillyInfosForm
          onSubmit={onSubmit}
          userData={userData}
          loading={loading}
        />
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Sélectionnez vos disponibilités
          </h3>
          <Calendar
            localizer={localizer}
            events={availabilities}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={["month", "week", "agenda"]}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 500 }}
          />
          {selectedEvent && (
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-700 mt-4"
              onClick={handleDeleteEvent}
            >
              Supprimer la disponibilité
            </Button>
          )}
        </div>
      </>
    )
  );
};

export default UserIsConnected;
