// import "./input.css";
import "./style.css";

/* Import af Motion One bibliotek */
import { animate, stagger, inView, scroll, timeline } from "motion";

scroll(animate(".progress", { strokeDasharray: ["0,1", "1,1"] }));

animate("body", { opacity: [0, 1] }, { duration: 4 });
