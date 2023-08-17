import { View, Image, Text, ScrollView, RefreshControl } from "react-native";
import styles from "./styles";
import IconButton from "../../components/IconButton";
import TasksCheckBox from "../../components/TasksCheckBox";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import CustomModal from "../../components/Modal";
import Swal from "sweetalert2";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import app from "../../services/firebase";

interface NavigationProps {
  navigation: any;
  route: any;
}

interface Task {
  task: string;
  checked: boolean;
}

const Tasks = ({ navigation, route }: NavigationProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const user: User = route.params.user;
  useEffect(() => {
    const getTasks = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "users", route.params.user.email);
      const docSnap = await getDoc(docRef);
      let tasks: Task[] = [];
      if (docSnap.exists() && docSnap.data().tasks) {
        tasks = docSnap.data().tasks;
      }
      setTasks(tasks);
    };
    getTasks();
  });

  const addTask = () => {
    Swal.fire({
      title: "Submit task name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        tasks.push({
          task: name,
          checked: false,
        });
        const db = getFirestore(app);
        await updateDoc(doc(db, "users", user.email!), {
          tasks: tasks,
        });
        setTasks(tasks);
        setRefresh(!refresh);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const renderTasks = () => {
    return tasks.map((task, index) => {
      return (
        <TasksCheckBox
          key={index}
          checked={task.checked}
          task={task.task}
          onValueChange={async () => {
            tasks[index].checked = !tasks[index].checked;
            setTasks(tasks);
            try {
              const db = getFirestore(app);
              await updateDoc(doc(db, "users", user.email!), {
                tasks: tasks,
              });
            } catch (error) {
              console.log(error);
            }
          }}
        ></TasksCheckBox>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 254,
          height: 228,
          zIndex: 10,
        }}
        source={require("../../../assets/shape-light.png")}
      ></Image>
      {/* header */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/img_avatar.png")}
        ></Image>
        <Text style={styles.headerText}>Welcome {user.displayName}!</Text>
      </View>
      {/* clock image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.clockImage}
          source={require("../../../assets/clock.png")}
        ></Image>
      </View>
      {/* tasks container */}
      <View style={styles.tasksListContainer}>
        <Text style={styles.tasksTitle}>Tasks List</Text>

        <View style={styles.tasksContainer}>
          <View style={styles.tasksHeader}>
            <Text style={styles.tasksHeaderText}>Daily Tasks</Text>
            <IconButton
              name="pluscircleo"
              onPress={() => {
                addTask();
              }}
            ></IconButton>
          </View>
          <View style={styles.tasksItemsContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={() => {}} />
              }
            >
              {renderTasks()}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Tasks;
