import swal from 'sweetalert';


export function successfullySubmitted(text = 'Submitted' , subtext = 'done'){
    swal({
        title: text,
        text: subtext,
        icon: "success",
        button: "OK",
      });
}

export function errorAlert(text = 'Submitted' , subtext = 'done'){
    swal({
        title: text,
        text: subtext,
        icon: "error",
        button: "OK",
      });
}


export function confirmationToSubmit(text = 'Submitted'){
    return new Promise(async (resolve) => {
    const result = await swal(text, {
        icon:'warning',
        buttons: {
        cancel: "Cancel",
        submit: "OK",
        },
    });
    resolve(result === "submit");
    });
}


export function confirmationToDelete(text = 'Submitted'){
    return new Promise(async (resolve) => {
    const result = await swal(text, {
        icon:'warning',
        buttons: {
        cancel: "Cancel",
        delete: "OK",
        },
    });
    resolve(result === "delete");
    });
}