// import 'package:flutter/material.dart';
// import 'package:frontend_flutter/dashboard.dart';
// import 'package:jwt_decoder/jwt_decoder.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// import 'login.dart';

// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   SharedPreferences prefs = await SharedPreferences.getInstance();
//   runApp(
//     MyApp(token: prefs.getString('token') ?? ''),
//   );
// }

// class MyApp extends StatelessWidget {
//   final String token; // Add explicit type declaration

//   const MyApp({
//     required this.token,
//     Key? key,
//   }) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       theme: ThemeData(
//         primarySwatch: Colors.blue,
//       ),
//       home: (JwtDecoder.isExpired(token) == false) ? Dashboard(token: token) : Login(),
//     );
//   }
// }

import 'package:flutter/material.dart';

import 'login.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Login(),
    );
  }
}
