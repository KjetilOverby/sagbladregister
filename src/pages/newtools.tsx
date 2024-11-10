/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import dateFormat from "dateformat";
import CreatePost from "~/components/newtools/CreatePost";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import Deleteblades from "~/components/newtools/deleteblades";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import TypesArticle from "~/components/reusable/TypesArticle";
import mtArticleTypes from "~/appdata/mtArticleTypes";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import CustomerCreate from "~/components/newtools/CustomerCreate";
import RoleAdminMT from "~/components/roles/RoleAdminMT";
import EditInputComponent from "~/components/newtools/EditInputComponent";
import NewBladesComponent from "~/components/newtools/NewBladesComponent";
const Newtools = ({ theme, setTheme }) => {
  const { data: sessionData } = useSession();
  // eslint-disable-next-line @typescript-eslint/unbound-method

  // endDate: `${year}-${month}-${date}`,
  // startDate: `${year}-${month}-${date}`,

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const [idValue, setIdValue] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);
  const [openEditID, setOpenEditID] = useState<string | null>(null);

  const openEditHandler = (postID: string) => {
    setOpenEditID(postID);
  };

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  const { data } = api.sawblades.getAllCreate.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  const { data: createCustomer } = api.sawblades.getAllCreateCustomer.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: customerInit,
  });
  const ctx = api.useContext();

  const editSawblade = api.sawblades.editSawblade.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllCreate.invalidate();
    },
  });

  return (
    <div data-theme={theme}>
      <>
        <RoleAdmin>
          <HeaderComponent setTheme={setTheme} />
          <NewBladesComponent
            setIdValue={setIdValue}
            setDateValue={setDateValue}
            dateValue={dateValue}
            data={data}
            theme={theme}
            openEditID={openEditID}
            openDeleteID={openDeleteID}
            openEditHandler={openEditHandler}
            editSawblade={editSawblade}
            deleteHandler={deleteHandler}
          />
        </RoleAdmin>
        <RoleAdminMV>
          <HeaderComponent setTheme={setTheme} />
          <CustomerCreate
            data={createCustomer}
            dateValue={dateValue}
            setDateValue={setDateValue}
            openDeleteID={openDeleteID}
            deleteHandler={deleteHandler}
            customerInit={customerInit}
            idValue={idValue}
            setIdValue={setIdValue}
            setOpenDeleteID={setOpenDeleteID}
            theme={theme}
            openEditID={openEditID}
            openEditHandler={openEditHandler}
            editSawblade={editSawblade}
          />
        </RoleAdminMV>
        <RoleAdminMT>
          <HeaderComponent setTheme={setTheme} />
          <CustomerCreate
            data={createCustomer}
            dateValue={dateValue}
            setDateValue={setDateValue}
            openDeleteID={openDeleteID}
            deleteHandler={deleteHandler}
            customerInit={customerInit}
            idValue={idValue}
            setIdValue={setIdValue}
            setOpenDeleteID={setOpenDeleteID}
          />
        </RoleAdminMT>
      </>
    </div>
  );
};

export default Newtools;
