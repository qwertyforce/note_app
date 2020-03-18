import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./theme";
import NoteEdit from "./NoteEdit";
import NoteAdd from "./NoteAdd";
import AuthModal from "./AuthModal";
import SettingsModal from "./SettingsModal";
import NotesGrid from "./NotesGrid";
import SnackBarNoteDeleted from "./SnackBarNoteDeleted";
import AppBar from "./AppBar";
import AddNoteFab from "./AddNoteFab";
import SnackBarAlert from "./SnackBarAlert";
 

 
const App = React.memo(props => {
  const [open_note_add, set_open_note_add] = React.useState(false);
  const [open_note_edit, set_open_note_edit] = React.useState(false);
  const [clicked_note, set_clicked_note] = React.useState({header: "",body: ""});
  const [search_query, set_search_query] = React.useState("");
  const [all_notes, set_all_notes] = React.useState(false);
  const [deleted_note, set_deleted_note] = React.useState([]);
  const [notes_before_deletion, set_notes_before_deletion] = React.useState([]);
  const [auth_status, set_auth_status] = React.useState("");
  const [theme_color, set_theme_color] = React.useState("light");
  const [sync_status, set_sync_status] = React.useState("");
  const [openSnackBarNoteDeleted, setOpenSnackBarNoteDeleted] = React.useState(false);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [openSettingsModal, setOpenSettingsModal] = React.useState(false);
  const [DynamicTheme, setTheme] = React.useState(createMuiTheme(theme));
  const [loading_notes_from_internet, set_loading_notes_from_internet] = React.useState(false);
  const [openSnackBarAlert, setOpenSnackBarAlert] = React.useState(false);
  const [SnackBarAlertData, setSnackBarAlertData] = React.useState({severity:"error",text:"efwefwe"});

  const get_data_from_local = () => {
    set_loading_notes_from_internet(false)
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      set_all_notes(notes);
    }
  };

  const sort_notes_by_last_modified = (notes) => {
    let new_notes = notes;
    new_notes.sort(function(a, b) {
      return b.last_modified - a.last_modified;
    });
    return new_notes
  };

const get_data_from_network = () => {
  fetch("https://notesbackend.qwertyforce.ru:8080/get_notes", { credentials: "include" })
    .then(res => res.json())
    .then(notes => {
      if (notes.error) {
        console.log(notes.error);
        if(notes.error==='auth'){
          setSnackBarAlertData({severity:"error",text:"Auth error. Please login again. Settings->Login"})
          setOpenSnackBarAlert(true)
          set_auth_status(false);
        }
        get_data_from_local();
      } else if (notes.length >= 0) {
        setSnackBarAlertData({severity:"success",text:"Synced  notes with server 👌"})
        setOpenSnackBarAlert(true)
        notes=sort_notes_by_last_modified(notes)
        set_all_notes(notes);
        set_auth_status(true);
        set_loading_notes_from_internet(false)
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setSnackBarAlertData({severity:"error",text:"Can`t get data from server. Using local copy."})
      setOpenSnackBarAlert(true)
      get_data_from_local()
    });
};

  const send_note_to_server = note => {
    fetch("https://notesbackend.qwertyforce.ru:8080/add_note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({ note: note })
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.error) {
          console.log(obj.error);
          if (obj.error === "auth") {
            set_auth_status(false);
          }
          add_data_to_sync_queue("add",note)
        } else {
          set_auth_status(true);
        }
      }).catch(error => {
      console.error("Error:", error);
      add_data_to_sync_queue("add",note)
    });;
  };

  const update_note_to_server = note => {
    fetch("https://notesbackend.qwertyforce.ru:8080/update_note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({ note: note })
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.error) {
          console.log(obj.error);
          if (obj.error === "auth") {
            set_auth_status(false);
          }
          add_data_to_sync_queue("update",note)
        } else {
          set_auth_status(true);
        }
      }).catch(error => {
      console.error("Error:", error);
      add_data_to_sync_queue("update",note)
    });
  };
  const delete_note_to_server = note => {
    fetch("https://notesbackend.qwertyforce.ru:8080/delete_note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({ note: note })
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.error) {
          console.log(obj.error);
          if (obj.error === "auth") {
            set_auth_status(false);
          }
          add_data_to_sync_queue("delete",note)
        } else {
          set_auth_status(true);
        }
      }).catch(error => {
      console.error("Error:", error);
      add_data_to_sync_queue("delete",note)
    });
  };
  

 
  const sync_local_with_server=()=>{
    console.log("sync triggered")
    let sync_status = localStorage.getItem("sync_status");
   if(sync_status==="sync"){
      console.log(sync_status)
      let sync_queue = localStorage.getItem("sync_queue");
      if(!sync_queue){
        get_data_from_network()
        return
      }
      fetch("https://notesbackend.qwertyforce.ru:8080/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({ data: JSON.parse(sync_queue) })
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.error) {
          console.log(obj.error);
          if (obj.error === "auth") {
            setSnackBarAlertData({severity:"error",text:"Auth error. Please login again. Settings->Login"})
            setOpenSnackBarAlert(true)
            set_auth_status(false);
          }
          get_data_from_local();
        } else {
          localStorage.setItem("sync_queue",[]); //successful sync
          set_auth_status(true);
          get_data_from_network()
        }
      }).catch(error => {
      console.error("Error:", error);
    });
      
    }
  }
  const add_data_to_sync_queue=(type,note)=>{
    var data={type:type,data:note}
    let sync_queue = localStorage.getItem("sync_queue");
    if(sync_queue){
      sync_queue = JSON.parse(sync_queue);
    }else{
      sync_queue=[]
    }
    sync_queue.push(data)
    localStorage.setItem("sync_queue",JSON.stringify(sync_queue));
  }
  


  React.useEffect(() => {
    window.addEventListener('online',  sync_local_with_server);
    window.addEventListener('visibilitychange', ()=>{if(!document.hidden)sync_local_with_server()});
    let sync_status_local = localStorage.getItem("sync_status");
    let theme_color_local = localStorage.getItem("theme_color");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let callback_authed = params.get("authed");
    if(callback_authed==="1"){
      update_sync_status_local_storage("sync");
      var new_url = window.location.href.substring(0, window.location.href.indexOf('?'));
      window.location.replace(new_url);
    }else{
      if (theme_color_local) {
       set_theme_color(theme_color_local)
     }else{
      localStorage.setItem("theme_color", theme_color);
     }
    if(theme_color_local==="dark"){
      handleChangeTheme()
     }
    if (!sync_status_local) {  //if doesn`t exist
      setOpenAuthModal(true);
    } else {
      set_sync_status(sync_status_local);
    }
    if (sync_status_local === "sync") {
      set_loading_notes_from_internet(true)
      let sync_queue = localStorage.getItem("sync_queue");
      if(sync_queue){
        sync_local_with_server()
      }else{
        get_data_from_network();
      }
      
    } else {
      get_data_from_local();
    }
    }
     
  }, []);

  
  const update_sync_status_local_storage= status => {
    localStorage.setItem("sync_status", status);
    set_sync_status(status)
  };

  const handleLocal = () => {
    handleCloseOpenAuthModal();
    update_sync_status_local_storage("local");
  };

  const handleSync = () => {
    handleCloseOpenAuthModal();
  };

  React.useEffect(() => {
    if (all_notes) {
      let notes = JSON.stringify(all_notes);
      console.log(notes);
      localStorage.setItem("notes", notes);
    }
  }, [all_notes]);

  const handleClickOpenNoteAdd = () => {
    set_open_note_add(true);
  };
  const handleCloseNoteAdd = () => {
    set_open_note_add(false);
  };

  const handleClickOpenNoteEdit = id => {
    set_open_note_edit(true);
    const found = all_notes.find(element => element.id === id);
    set_clicked_note(found);
  };
  const handleCloseNoteEdit = () => {
    set_open_note_edit(false);
  };

  const handleClickDeleteNote = () => {
    handleCloseNoteEdit();
    set_notes_before_deletion(all_notes);
    var id = clicked_note.id;
    const deleted_note = all_notes.find(element => element.id === id);
    set_deleted_note(deleted_note);
    var updated = all_notes.filter(el => el.id !== id);
    set_all_notes(updated);
    setOpenSnackBarNoteDeleted(true);
    if (sync_status === "sync") {
      delete_note_to_server({ id: id });
    }
  };

  const handleClickSaveChanges = (header, body) => {
    if (
      (header === undefined && body === undefined) ||
      (header === "" && body === "")
    ) {
      return;
    }
    handleCloseNoteEdit();
    var id = clicked_note.id;
    var note = { header: header.toString(), body: body.toString(), id: id,last_modified:Date.now()};
    var updated = all_notes.map(el => {
      if (el.id === id) {
        el = note;
      }
      return el;
    });
    if (sync_status === "sync") {
      update_note_to_server(note);
    }
    updated=sort_notes_by_last_modified(updated)
    set_all_notes(updated);
  };
  const handleClickAddNote = (header, body) => {
    if (
      (header === undefined && body === undefined) ||
      (header === "" && body === "")
    ) {
      return;
    }
    handleCloseNoteAdd();
    var time=Date.now()
    var note = { header: header.toString(), body: body.toString(), id:time,last_modified:time};
    if (all_notes === false) {
      set_all_notes([note]);
    } else {
      var updated = [...all_notes, note];
      updated=sort_notes_by_last_modified(updated)
      set_all_notes(updated);
    }
    if (sync_status === "sync") {
      send_note_to_server(note);
    }
  };
  
  const handleDeleteUndo = () => {
    if (sync_status === "sync") {
      send_note_to_server(deleted_note);
    }
    set_all_notes(notes_before_deletion);
    setOpenSnackBarNoteDeleted(false);
  };
  const handleCloseSnackBarNoteDeleted = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBarNoteDeleted(false);
  };
  
  const handleCloseOpenAuthModal = () => {
    setOpenAuthModal(false);
  };

  
  const handleCloseOpenSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  const handleGetLink = message => {
    handleCloseOpenSettingsModal();
    if (message === "Login") {
      setOpenAuthModal(true);
    } else {
      window.location.replace("https://notesbackend.qwertyforce.ru:8080/logout");
    }
  };
  

  const handleCloseSnackBarAlert = () => {
    setOpenSnackBarAlert(false);
  };

  

  

  const handleChangeTheme = () => {
    theme.palette.type = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem("theme_color", theme.palette.type);
    setTheme(createMuiTheme(theme));
  };

  return (
    <ThemeProvider theme={DynamicTheme}>
      <CssBaseline />
      <div>
        <AppBar
          {...props}
          handleInputOnChange={e => set_search_query(e.target.value)}
          handleMenuClick={() => setOpenSettingsModal(true)}
        />
        <AddNoteFab handleClickOpenNoteAdd={handleClickOpenNoteAdd} />
        <SnackBarNoteDeleted
          open={openSnackBarNoteDeleted}
          handleDeleteUndo={handleDeleteUndo}
          handleClose={handleCloseSnackBarNoteDeleted}
        />
        <NoteAdd
          handleClose={handleCloseNoteAdd}
          open={open_note_add}
          handleClickAddNote={handleClickAddNote}
        />
        <NoteEdit
          handleClose={handleCloseNoteEdit}
          open={open_note_edit}
          header={clicked_note.header}
          body={clicked_note.body}
          handleClickDeleteNote={handleClickDeleteNote}
          handleClickSaveChanges={handleClickSaveChanges}
        />
        <AuthModal
          open={openAuthModal}
          handleClose={handleCloseOpenAuthModal}
          handleLocal={handleLocal}
          handleSync={handleSync}
        />
        <NotesGrid
          notes={all_notes}
          search_query={search_query}
          handleClick={handleClickOpenNoteEdit}
          loading_notes_from_internet={loading_notes_from_internet}
        />
        <SettingsModal
          open={openSettingsModal}
          handleClose={handleCloseOpenSettingsModal}
          auth={auth_status}
          sync={sync_status}
          handleChangeTheme={handleChangeTheme}
          getLink={handleGetLink}
        />
         <SnackBarAlert
          open={openSnackBarAlert}
          handleClose={handleCloseSnackBarAlert}
          data={SnackBarAlertData}
        />
      </div>
    </ThemeProvider>
  );
},(prevProps, nextProps) =>true)

export default App;