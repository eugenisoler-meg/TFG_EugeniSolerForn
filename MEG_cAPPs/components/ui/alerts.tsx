import { Alert } from "react-native";

export function showUnsavedChangesAlert(navigation: any, e: any){
  Alert.alert(
        "Sortir sense desar?",
        "Hi ha canvis sense desar. Vols sortir igualment?",
        [
          { text: "Cancel·la", style: "cancel" },
          {
            text: "Sortir",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    };

export function Success(success: string, router:any){
  Alert.alert(
        "Operació completada",
        success,
        [
          {
            text: "D'acord",
            style: "default",
            onPress: () => {router.back()},
          },
        ]
      );
    };