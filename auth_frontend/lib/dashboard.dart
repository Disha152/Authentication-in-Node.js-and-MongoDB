import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Dashboard extends StatefulWidget {
  final token;

  const Dashboard({@required this.token, Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  late String email;
  late String user;
  List<dynamic> cartData = [];
  List<dynamic> Products = [];

  @override
  void initState() {
    super.initState();

    if (widget.token != null) {
      Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
      email = jwtDecodedToken['email'] ?? '';
      user = jwtDecodedToken['_id'] ?? '';
      fetchUserCart();
      getProducts();
    } else {
      // Handle the case when token is null
      email = '';
      user = '';
    }
  }

  Future<void> fetchUserCart() async {
    final url = Uri.parse('http://192.168.1.2:9459/api/cart/getUserCart?user=$email');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      setState(() {
        cartData = responseData['data'];
      });
    }
  }

  Future<void> getProducts() async {
    final url = Uri.parse('http://192.168.1.2:9459/api/product/getProducts');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      setState(() {
        Products = responseData['data'];
      });
    }
  }

  Map<String, dynamic>? getProductDetails(String productId) {
    return Products.firstWhere((product) => product['_id'] == productId, orElse: () => null);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Dashboard'),
        ),
        body: ListView.builder(
          itemCount: cartData.length,
          itemBuilder: (context, index) {
            final item = cartData[index];
            final productId = item['product'];
            final product = getProductDetails(productId);

            if (product != null) {
              return ListTile(
                leading: Image.network(product['images'],height:50,width:40),
                title: Text(product['title']),
                subtitle: Column(children: [
                  Text(product['description']),
                  Row(children: [
                    Text('Price: ${product['price']}'),
                    Text('Quantity: ${item['quantity']}'),
                  ],)
                ],)
                
                // subtitle: Text('Quantity: ${item['quantity']}'),
                // Add more fields from product to show more details
                // ...
              );
            } else {
              return ListTile(
                title: Text('Product not found'),
              );
            }
          },
        ),
      ),
    );
  }
}




// import 'package:flutter/material.dart';
// import 'package:jwt_decoder/jwt_decoder.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';

// class Dashboard extends StatefulWidget {
//   final token;

//   const Dashboard({@required this.token, Key? key}) : super(key: key);

//   @override
//   State<Dashboard> createState() => _DashboardState();
// }

// class _DashboardState extends State<Dashboard> {
//   late String email;
//   late String user;
//   List<dynamic> cartData = [];
//   List<dynamic> Products = [];

//   @override
//   void initState() {
//     super.initState();

//     if (widget.token != null) {
//       Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
//       email = jwtDecodedToken['email'] ?? '';
//       user = jwtDecodedToken['_id'] ?? '';
//       fetchUserCart();
//     } else {
//       // Handle the case when token is null
//       email = '';
//       user = '';
//     }
//   }

//   Future<void> fetchUserCart() async {
//     final url =
//         Uri.parse('http://192.168.1.2:9459/api/cart/getUserCart?user=$user');
//     final response = await http.get(url);

//     if (response.statusCode == 200) {
//       final responseData = json.decode(response.body);
//       setState(() {
//         cartData = responseData['data'];
//       });
//     }
//   }

//   Future<void> getProducts() async {
//     final url = Uri.parse('http://localhost:9459/api/product/getProducts');
//     final response = await http.get(url);

//     if (response.statusCode == 200) {
//       final responseData = json.decode(response.body);
//       setState(() {
//         Products = responseData['data'];
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return SafeArea(
//       child: Scaffold(
//         appBar: AppBar(
//           title: Text('Dashboard'),
//         ),
//         body: ListView.builder(
//           itemCount: cartData.length,
//           itemBuilder: (context, index) {
//             final item = cartData[index];
//             final productId = item['product'];
//             return ListTile(
//               title: Text(item['product']),
//               subtitle: Text('Quantity: ${item['quantity']}'),
//             );
//           },
//         ),
//       ),
//     );
//   }
// }
