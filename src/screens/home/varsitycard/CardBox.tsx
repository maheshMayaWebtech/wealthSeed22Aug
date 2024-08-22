import "./CardBox.css";
import Link from "next/link";
import Image from "next/image";
import { Data } from "@/constants/CardData";
const CardBox = () => {
  return (
    <>
      {Data.map((item, id) => {
        return (
          <section className="varsityCard" key={id}>
            <div className="wrapperBox">
              <Link
                href={`${item.url}`}
                className="cardback"
                style={{ backgroundColor: item.color }}
              >
                <span className="cardOuterWrap">
                  <Image
                    src={item.image}
                    alt={item.imagetitle}
                    className="cardlogo"
                  />
                </span>
                <strong className="modulesOuterBox">{item.title}</strong>
              </Link>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default CardBox;
