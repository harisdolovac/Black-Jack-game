






 fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      var user = fire.auth().currentUser;
      user.updateProfile({
        displayName: name,
      });
      // fire
      //   .database()
      //   .ref("UserInfo/" + user.uid)
      //   .set({
      //     FirstName: name,
      //     Score: amount,
      //   });
    }
  });

  useEffect(() => {
    fire
      .database()
      .ref("UserInfo/" + user.uid)
      .set({
        Score: amount,
      });
  }, [amount]);

  // const firestore = fire.database().ref("/UserInfo");
  // console.log(firestore);
  // firestore.on("value", (response) => {
  //   const data = response.val();
  //   console.log(data);
  // });

  // fire.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     // setUser(user);
  //     // userName();
  //     // userScore();
  //     // user.updateProfile({
  //     //   displayName: name,
  //     // });
  //     fire
  //       .database()
  //       .ref("UserInfo/" + user.uid)
  //       .set({
  //         FirstName: name,
  //         Score: amount,
  //       });
  //
  //   } else {
  //     // No user is signed in.
  //     setUser("nema nikog");
  //   }
  // });

  // useEffect(() => {
  //   fire.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       console.log(user);

  //       fire
  //         .database()
  //         .ref("UserInfo/" + user.uid)
  //         .set({
  //           FirstName: name,
  //           Score: amount,
  //         });
  //     }
  //   });
  // }, [])

  useEffect(() => {
    const firestore = fire.database().ref("/UserInfo");
    firestore.on("value", (response) => {
      const data = response.val();
      
      let userInfo = [];
      for (let id in data) {
        userInfo.push({
          id: id,
          name: data[id].FirstName,
          score: data[id].Score,
        });
      }

      setUserData(userInfo);
    });
  }, [amount]); //cita iz baze

  const eff = () => {
    // const firestore = fire.database().ref("/UserInfo");
    // firestore.on("value", (response) => {
    //   const data = response.val();
    //   let userInfo = [];
    //   for (let id in data) {
    //     userInfo.push({
    //       id: id,
    //       name: data[id].FirstName,
    //       score: data[id].Score,
    //     });
    //   }
    //   setUserData(userInfo);
    // });
    // console.log("effect", userData);
  };

  const log = () => {
    let user = fire.auth().currentUser;
    // console.log("naem", name);
    //console.log(user);
    // console.log("display name", user.displayName);
    console.log("amount", amount);
    // console.log(typeof amount);
    console.log(user);
  };

  const logOut = () => {
    fire.auth().signOut();
  };







  const prijavljenjiKorisnik = () => {
    // fire.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     setUser(user);
    //   } else {
    //     // No user is signed in.
    //     setUser("nema nikog");
    //   }
    // });
  };

  // const userName = () => {
  //   var user = fire.auth().currentUser;
  //   user
  //     .updateProfile({
  //       displayName: name,
  //     })
  //     .then(function () {
  //       // Update successful.
  //       // console.log(displayName);
  //     });
  // };

  var database = fire.database();

  const userScore = () => {
    // fire
    //   .database()
    //   .ref("UserInfo/" + user.uid)
    //   .set({
    //     FirstName: user.displayName,
    //     Score: amount,
    //   });
  };



     <button onClick={() => prijavljenjiKorisnik()}>
     prijavljenjiKorisnik
   </button>
   <button onClick={() => logOut()}>Log out</button>
   {/* <button onClick={() => userName()}>update user name</button> */}
   <button onClick={() => userScore()}>update score</button>
