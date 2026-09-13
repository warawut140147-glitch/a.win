// เครื่องมือจำลองฐานข้อมูล/บริการ (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชันสำหรับจำลองเวลา Timeout ในสถานการณ์ที่ 4
const timeoutPromise = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("หมดเวลาการรอคอยข้อมูล (Timeout)")), ms)
  );

async function main() {
  // ==============================================================================
  // สถานการณ์ที่ 1: หน้าแรก (เปิดหน้าแรกเมื่อครบทุกชิ้น / ชิ้นใดล้มเหลวเปิดไม่ได้)
  // เลือกใช้: Promise.all
  // เหตุผล: Promise.all จะรอให้ทุก Promise สำเร็จทั้งหมดจึงจะ Resolve (ครบทุกชิ้น) 
  //        แต่หากมี Promise ตัวใดตัวหนึ่ง Reject จะทำการ Short-circuit และตัดเข้า Catch ทันที
  // ==============================================================================
  console.log("=== สถานการณ์ที่ 1: หน้าแรก (Promise.all) ===");

  // 1.1 กรณีทุกชิ้นสำเร็จทั้งหมด
  try {
    const pageData = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log("ครบ → เปิดหน้าแรก:", pageData.join(" + "));
  } catch (error) {
    console.log("หน้าแรกเปิดไม่ได้:", error.message);
  }

  // 1.2 กรณีมีชิ้นใดชิ้นหนึ่งล้มเหลว (ประกาศ willFail = true)
  try {
    const pageData = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log("ครบ → เปิดหน้าแรก:", pageData.join(" + "));
  } catch (error) {
    console.log("ชิ้นใดล้ม → หน้าแรกเปิดไม่ได้:", error.message);
  }
  console.log("");

  // ==============================================================================
  // สถานการณ์ที่ 2: แจ้งเตือนผลสอบ (รายงานผลทุกช่องทาง ช่องที่ล้มห้ามทำรายงานพัง)
  // เลือกใช้: Promise.allSettled
  // เหตุผล: Promise.allSettled จะรอให้ทุก Promise ทำงานเสร็จสิ้นทั้งหมด (รู้ผลทุกชิ้น)
  //        โดยไม่ตัดการทำงานเมื่อมี Error ทำให้ได้สถานะ (fulfilled/rejected) ของทุกรายการ
  //        และนำมารายงานผลต่อได้อย่างปลอดภัยโดยไม่ทำให้โปรแกรม Crash
  // ==============================================================================
  console.log("=== สถานการณ์ที่ 2: แจ้งเตือนผลสอบ (Promise.allSettled) ===");

  const notificationResults = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);

  console.log("รายงานผลการส่งแจ้งเตือน:");
  notificationResults.forEach((result, index) => {
    const channelName = ["อีเมล", "SMS", "แอป"][index];
    if (result.status === "fulfilled") {
      console.log(` - ช่องทาง ${channelName}: ส่งสำเร็จ (${result.value})`);
    } else {
      console.log(` - ช่องทาง ${channelName}: ล้มเหลว (${result.reason.message})`);
    }
  });
  console.log("");

  // ==============================================================================
  // สถานการณ์ที่ 3: Mirror Server (เอาข้อมูลจากตัวแรกที่ทำงานสำเร็จ)
  // เลือกใช้: Promise.any
  // เหตุผล: Promise.any จะเลือกเอาผลลัพธ์จาก Promise ตัวแรกที่ Fulfilled (ตัวแรกที่สำเร็จ)
  //        และจะข้าม (Ignore) ตัวที่ Rejected ไปจนกว่าเจอตัวที่สำเร็จ หากล้มเหลวทุกตัวถึงจะ Reject
  // ==============================================================================
  console.log("=== สถานการณ์ที่ 3: Mirror Server (Promise.any) ===");

  try {
    const fastestServerData = await Promise.any([
      wait(300, "mirror-A", true), // ช้ากว่า 300ms แต่ล้มเหลว
      wait(600, "mirror-B")       // 600ms แต่ทำงานสำเร็จ
    ]);
    console.log("ได้ข้อมูลตัวแรกที่สำเร็จ → ใช้ข้อมูลจาก:", fastestServerData);
  } catch (error) {
    console.log("เซิร์ฟเวอร์ทั้งหมดล้มเหลว:", error.message);
  }
  console.log("");

  // ==============================================================================
  // สถานการณ์ที่ 4: ค้นหาข้อมูล + Timeout (ตัวแรกที่จบ ไม่ว่าจะสำเร็จหรือล้มเหลว)
  // เลือกใช้: Promise.race
  // เหตุผล: Promise.race จะคืนค่าผลลัพธ์จาก Promise ตัวที่ทำงานเสร็จสิ้นก่อนเพื่อน (ตัวแรกที่จบ)
  //        ไม่ว่าจะ Resolve หรือ Reject ก็ตาม นำมาใช้แข่งขันเวลากับ timeoutPromise
  // ==============================================================================
  console.log("=== สถานการณ์ที่ 4: ค้นหาข้อมูล + Timeout 800ms (Promise.race) ===");

  try {
    const searchResult = await Promise.race([
      wait(1200, "ข้อมูลจากฐานข้อมูล"), // ใช้เวลา 1200ms
      timeoutPromise(800)              // ตัดเวลาที่ 800ms
    ]);
    console.log("ผลการค้นหา:", searchResult);
  } catch (error) {
    console.log("เกิน 800ms → เลิกรอ → ใช้แคชเก่าแทน (เหตุผล:", error.message + ")");
  }
}

main();