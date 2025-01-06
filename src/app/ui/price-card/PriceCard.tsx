"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

import Button from "../Button";

import styles from "./Price.module.css";

interface CardProps {
  i: number;
  price: string;
  title: string;
  description: string;
  poster: string;
  url?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const PriceCard: React.FC<CardProps> = ({
  i,
  price,
  title,
  description,
  poster,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className={styles.cardContainer}
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`${styles.card} bg-secondary max-w-[80%]`}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <Button
              type="button"
              className="mt-5 text-black drop-shadow-md font-bold bg-custom-gradient hover:bg-hover-custom-gradient rounded-3xl px-4 py-4 "
            >
              <Link
                href={`/${price}`}
                className={`mx-5`}
              >
                See more info
              </Link>
            </Button>
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{ scale: imageScale }}
            >
              <Image
                fill
                src={`${poster}`}
                alt="image"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PriceCard;
