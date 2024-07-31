import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthUserContext";
<<<<<<< HEAD
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
} from "@/firebase/firestore";
=======
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import {
    addOrUpdateDataToFirebase,
    getDataFromFirebase,
} from "@/firebase/firestore";
import { UserType } from "@/types/User";
import FamillyInfosForm from "./FamillyInfosForm";
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70
import { formSchema } from "@/types/Forms";
import { Availability, UserType } from "@/types/User";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Calendar, Event, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import { z } from "zod";
import FamillyInfosForm from "./FamillyInfosForm";

<<<<<<< HEAD
const localizer = momentLocalizer(moment);

const UserIsConnected = () => {
  const { authUserInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Availability | null>(null);
=======
const UserIsConnected = () => {
    const authUserInfo = useContext(AuthContext);
    const [userData, setUserData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70

  useEffect(() => {
    if (userData === null && authUserInfo) {
      const handleGetUserData = async () => {
        const result = await getDataFromFirebase("users", authUserInfo.uid);
        if (result.error) {
          console.error(result.error);
          return;
        }
<<<<<<< HEAD
        if (result.data) {
          const userData = result.data as UserType;
          setUserData(userData);
          setAvailabilities(userData.familyAvailabilities || []);
=======
    }, [authUserInfo.authUserInfo?.uid, userData]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        if (authUserInfo && authUserInfo.authUserInfo) {
            const { error } = await addOrUpdateDataToFirebase(
                "users",
                authUserInfo.authUserInfo.uid,
                values
            );
            if (error) {
                setLoading(false);
                toast.error("Un problème est survenu !");
                return;
            }
            toast.success("Mise à jour reussie");
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70
        }
      };
      handleGetUserData();
    }
  }, [authUserInfo, userData]);

<<<<<<< HEAD
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
=======
    return (
        userData && (
            <FamillyInfosForm
                onSubmit={onSubmit}
                userData={userData}
                loading={loading}
            />
        )
    );
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70
};

export default UserIsConnected;
