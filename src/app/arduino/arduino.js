// #include <Wire.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>
// #include <DHT.h>
// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>
// #include <WiFiUdp.h>
// #include <NTPClient.h>
// #include <ESP8266HTTPClient.h>
// #include <WiFiClientSecure.h>

// #define SCREEN_WIDTH 128
// #define SCREEN_HEIGHT 64
// Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// #define DHTPIN D3
// #define DHTTYPE DHT11
// DHT dht(DHTPIN, DHTTYPE);

// const int mq5Pin = A0;
// const int buzzerPin = D7;
// const int ledMerah = D6;
// const int ledHijau = D5;

// #define WIFI_SSID "Tanpanamadulu"
// #define WIFI_PASSWORD "LenovoAsus"
// #define FIREBASE_HOST "nodemcu-daa94-default-rtdb.asia-southeast1.firebasedatabase.app"
// #define FIREBASE_AUTH "AIzaSyDQW5gLzAOJixv1UnLf8pfh0VRVt5yDt2U"
// FirebaseData firebaseData;

// WiFiUDP udp;
// NTPClient timeClient(udp, "pool.ntp.org", 0, 60000);
// unsigned long lastFirebaseUpdate = 0;
// const unsigned long dataInterval = 5000;

// const String daftarNomor[] = {
//   "6285175055477",
//   "6282325289961"
// };
// const int jumlahNomor = sizeof(daftarNomor) / sizeof(daftarNomor[0]);
// const char* fonnteToken = "9kmbeBqSFGaawsssYyqy";

// bool sudahKirimNotifikasi = false;
// bool firebaseConnected = false;

// // Threshold dari Firebase
// int thresholdSuhu = 30;
// int thresholdGas = 150;
// int thresholdKelembapan = 100;

// // Lokasi
// const String lokasi = "Ruang Server";

// // ---------- Fungsi Notifikasi WhatsApp ----------
// void kirimNotifikasiWA(String nomor, String pesan) {
//   if (WiFi.status() == WL_CONNECTED) {
//     WiFiClientSecure client;
//     client.setInsecure();
//     HTTPClient http;
//     http.begin(client, "https://api.fonnte.com/send");
//     http.addHeader("Authorization", fonnteToken);
//     http.addHeader("Content-Type", "application/x-www-form-urlencoded");
//     String postData = "target=" + nomor + "&message=" + pesan;
//     http.POST(postData);
//     http.end();
//   }
// }

// void kirimKeSemuaNomor(String pesan) {
//   for (int i = 0; i < jumlahNomor; i++) {
//     kirimNotifikasiWA(daftarNomor[i], pesan);
//     delay(1000);
//   }
// }

// String formatWaktu() {
//   time_t rawTime = timeClient.getEpochTime();
//   struct tm* timeInfo = localtime(&rawTime);

//   char tanggal[11];
//   char waktu[9];
//   sprintf(tanggal, "%02d-%02d-%04d", timeInfo->tm_mday, timeInfo->tm_mon + 1, timeInfo->tm_year + 1900);
//   sprintf(waktu, "%02d:%02d:%02d", timeInfo->tm_hour, timeInfo->tm_min, timeInfo->tm_sec);

//   return String(tanggal) + " " + String(waktu);
// }

// String buatPesanBahaya(float suhu, int gas) {
//   if (suhu >= thresholdSuhu) {
//     return "🔥 Notifikasi Suhu Tinggi\n⚠️ Peringatan! Suhu di ruang server melebihi batas normal.\n📍 Lokasi: " + lokasi +
//            "\n🌡️ Suhu saat ini: " + String(suhu) + "°C\n🚨 Mohon segera lakukan pengecekan untuk mencegah gangguan sistem.";
//   } else if (gas > thresholdGas) {
//     return "💨 Notifikasi Terdeteksi Asap\n🚨 PERINGATAN! Deteksi asap di ruang server!\n📍 Lokasi: " + lokasi +
//            "\n🕒 Waktu: " + formatWaktu() + "\n⚠️ Segera lakukan pemeriksaan untuk mencegah risiko kebakaran.";
//   } else if (suhu < 18) {
//     return "🧊 Notifikasi Suhu Terlalu Rendah\n⚠️ Peringatan! Suhu ruang server terlalu rendah.\n🌡️ Suhu saat ini: " +
//            String(suhu) + "°C\n❄️ Periksa sistem pendingin, dikhawatirkan terjadi gangguan.";
//   }
//   return "";
// }

// String buatPesanNormal(float suhu) {
//   return "🌡️ Notifikasi Pemulihan Suhu\n✅ Info: Suhu ruang server telah kembali normal.\n🌡️ Suhu saat ini: " +
//          String(suhu) + "°C\n🕒 Waktu: " + formatWaktu() + "\nTerima kasih atas respon cepat Anda.";
// }

// // Ambil Threshold dari Firebase
// void ambilThresholdDariFirebase() {
//   if (Firebase.getInt(firebaseData, "/pengaturan/suhu/thresholds"))
//     thresholdSuhu = firebaseData.intData();
  
//   if (Firebase.getInt(firebaseData, "/pengaturan/gas/thresholds"))
//     thresholdGas = firebaseData.intData();
  
//   if (Firebase.getInt(firebaseData, "/pengaturan/kelembapan/thresholds"))
//     thresholdKelembapan = firebaseData.intData();
// }

// void setup() {
//   Serial.begin(115200);
//   dht.begin();
//   pinMode(buzzerPin, OUTPUT);
//   pinMode(ledMerah, OUTPUT);
//   pinMode(ledHijau, OUTPUT);

//   Wire.begin(D2, D1);
//   display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
//   display.clearDisplay();
//   display.setTextColor(SSD1306_WHITE);
//   display.setTextSize(1);
//   display.setCursor(0, 0);
//   display.println("Menghubungkan WiFi...");
//   display.display();

//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }

//   display.clearDisplay();
//   display.setCursor(0, 0);
//   display.println("WiFi Terhubung!");
//   display.display();

//   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//   Firebase.reconnectWiFi(true);
//   firebaseConnected = Firebase.ready();

//   display.setCursor(0, 15);
//   display.println(firebaseConnected ? "Firebase Terhubung!" : "❌ Firebase Gagal!");
//   display.display();
//   delay(1000);

//   timeClient.begin();
//   timeClient.setTimeOffset(7 * 3600);
// }

// void loop() {
//   timeClient.update();
//   ambilThresholdDariFirebase();

//   float temperature = dht.readTemperature();
//   float humidity = dht.readHumidity();
//   int gasValue = analogRead(mq5Pin);

//   bool sensorValid = !isnan(temperature) && !isnan(humidity);
//   bool kondisiBahaya = (sensorValid && (temperature >= thresholdSuhu || gasValue > thresholdGas || temperature < 18));

//   // === Ambil Alarm Status dan Source dari Firebase ===
//   String alarmSource = "";
//   String alarmStatus = "";

//   if (Firebase.getString(firebaseData, "/alarm/source")) {
//     alarmSource = firebaseData.stringData();
//   }

//   if (Firebase.getString(firebaseData, "/alarm/status")) {
//     alarmStatus = firebaseData.stringData();
//   }

//   // === Logika Pengendalian Alarm Berdasarkan Suhu ===
//   if (sensorValid) {
//     if (temperature < thresholdSuhu && alarmSource == "web") {
//       Firebase.setString(firebaseData, "/alarm/source", "arduino");
//       Serial.println("✅ Suhu normal, source diubah ke 'arduino'");
//     }

//     if (temperature >= thresholdSuhu && alarmSource == "arduino") {
//       Firebase.setString(firebaseData, "/alarm/status", "on");
//       alarmStatus = "on";  // Update status lokal agar tidak perlu tunggu loop berikutnya
//       Serial.println("🔥 Suhu tinggi, alarm diaktifkan");
//     }
//   }

//   // === Pengendalian Buzzer dan LED Berdasarkan Status Alarm ===
//   if (alarmStatus == "on") {
//     tone(buzzerPin, 1000);
//     digitalWrite(ledMerah, HIGH);
//     digitalWrite(ledHijau, LOW);
//   } else {
//     noTone(buzzerPin);
//     digitalWrite(ledMerah, LOW);
//     digitalWrite(ledHijau, HIGH);
//   }

//   // === Tampilkan ke OLED ===
//   display.clearDisplay();
//   display.setCursor(0, 0);
//   display.println("Monitoring Lingkungan");
//   display.setCursor(0, 15);
//   display.print("Suhu: ");
//   display.println(sensorValid ? String(temperature) + " C" : "Err");
//   display.setCursor(0, 25);
//   display.print("Lembap: ");
//   display.println(sensorValid ? String(humidity) + " %" : "Err");
//   display.setCursor(0, 35);
//   display.print("Gas: ");
//   display.println(gasValue);
//   display.setCursor(0, 50);
//   display.println(sensorValid ? (kondisiBahaya ? "Status: BAHAYA!" : "Status: Aman") : "Sensor Error");
//   display.display();

//   // === Kirim data ke Firebase setiap 10 detik ===
//   if (sensorValid && Firebase.ready()) {
//     if (millis() - lastFirebaseUpdate >= dataInterval) {
//       lastFirebaseUpdate = millis();

//       time_t rawTime = timeClient.getEpochTime();
//       struct tm* timeInfo = localtime(&rawTime);

//       char tanggal[11];
//       char waktu[9];
//       sprintf(tanggal, "%02d-%02d-%04d", timeInfo->tm_mday, timeInfo->tm_mon + 1, timeInfo->tm_year + 1900);
//       sprintf(waktu, "%02d:%02d:%02d", timeInfo->tm_hour, timeInfo->tm_min, timeInfo->tm_sec);

//       String basePath = "/riwayat/" + String(tanggal) + "/" + String(waktu);
//       Firebase.setFloat(firebaseData, basePath + "/suhu", temperature);
//       Firebase.setFloat(firebaseData, basePath + "/kelembapan", humidity);
//       Firebase.setInt(firebaseData, basePath + "/gas", gasValue);

//       Firebase.setFloat(firebaseData, "/terkini/suhu", temperature);
//       Firebase.setFloat(firebaseData, "/terkini/kelembapan", humidity);
//       Firebase.setInt(firebaseData, "/terkini/gas", gasValue);
//       Firebase.setString(firebaseData, "/terkini/waktu", String(waktu));
//       Firebase.setString(firebaseData, "/terkini/tanggal", String(tanggal));

//       Serial.println("✅ Data Firebase diperbarui");
//     }
//   }

//   // === Kirim Notifikasi WhatsApp Sekali Saja ===
//   if (sensorValid && kondisiBahaya && !sudahKirimNotifikasi) {
//     String pesan = buatPesanBahaya(temperature, gasValue);
//     if (pesan != "") {
//       kirimKeSemuaNomor(pesan);
//       sudahKirimNotifikasi = true;
//     }
//   } else if (sensorValid && !kondisiBahaya && sudahKirimNotifikasi) {
//     String pesan = buatPesanNormal(temperature);
//     kirimKeSemuaNomor(pesan);
//     sudahKirimNotifikasi = false;
//   }

//   delay(1000);
// }
