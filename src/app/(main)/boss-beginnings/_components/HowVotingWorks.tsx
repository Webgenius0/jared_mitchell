import Container from "@/Components/Common/Container";
import VotingCard from "./VotingCard";
import { CMSBossBeginningsSteps } from "@/Types/cms";

interface HowVotingWorksProps {
  data: CMSBossBeginningsSteps;
}

const cardsData = [
  {
    imageUrl:
      "https://i.ibb.co.com/Q7NTvt3j/0e80b365a7601773650935ca5350a31128af8d9d.jpg",
    title: "Arts & Culture Festival",
    author: "Maria Santos",
    description:
      "A sustainable fashion boutique bringing eco-friendly clothing to our community. Maria's mission is to make ethical fashion accessible while supporting local artisans.",
    votes: 234,
    totalVotes: 890,
  },
  {
    imageUrl:
      "https://i.ibb.co.com/Q7NTvt3j/0e80b365a7601773650935ca5350a31128af8d9d.jpg",
    title: "Tech Start Academy",
    author: "Maria Santos",
    description:
      "A sustainable fashion boutique bringing eco-friendly clothing to our community. Maria's mission is to make ethical fashion accessible while supporting local artisans.",
    votes: 189,
    totalVotes: 890,
  },
  {
    imageUrl:
      "https://i.ibb.co.com/Q7NTvt3j/0e80b365a7601773650935ca5350a31128af8d9d.jpg",
    title: "Nourish Meal Prep",
    author: "Maria Santos",
    description:
      "Healthy meal delivery service specializing in culturally diverse cuisines. Making nutrition accessible and celebrating food heritage.",
    votes: 312,
    totalVotes: 890,
  },
  {
    imageUrl:
      "https://i.ibb.co.com/Q7NTvt3j/0e80b365a7601773650935ca5350a31128af8d9d.jpg",
    title: "Creative Kids Studio",
    author: "Maria Santos",
    description:
      "Art and music education center for children, fostering creativity and confidence through hands-on learning experiences.",
    votes: 612,
    totalVotes: 890,
  },
];

const HowVotingWorks = ({ data }: HowVotingWorksProps) => {
  const steps = data?.metadata?.steps ?? [];

  return (
    <section className="section">
      <h2 className="section_title">
        {data?.title ?? "Vote for the Next Honoree"}
      </h2>
      <p className="section_sub_title">
        {data?.sub_title ??
          "Help us choose which new business will be celebrated at our next OSI Top Business Award event."}
      </p>
      <div className="py-8 md:py-10 lg:py-12 xl:py-[60px] bg-[#1977DD33] mt-6 md:mt-8 lg:mt-10 xl:mt-11">
        <Container>
          <h5 className="text-xl md:text-2xl lg:text-3xl text-primary-black font-semibold mb-3 md:mb-4 lg:mb-5">
            How Voting Works
          </h5>
          <ul className="text-sm md:text-base lg:text-lg xl:text-2xl text-primary-black space-y-4 md:space-y-5 lg:space-y-6 list-inside list-disc">
            {steps.length > 0 ? (
              steps.map((step, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{step.title}</span> —{" "}
                  {step.description}
                </li>
              ))
            ) : (
              <>
                <li>Each OSI member gets 1 free vote per contest</li>
                <li>
                  Want to support more? Purchase additional votes for $1 each
                </li>
                <li>Community votes count for 50% of the final selection</li>
                <li>
                  OSI judging panel evaluates mission, impact, and execution for
                  the other 50%
                </li>
              </>
            )}
          </ul>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mt-6 md:mt-8 lg:mt-10 xl:mt-11">
          {cardsData.map((card, index) => (
            <VotingCard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              author={card.author}
              description={card.description}
              votes={card.votes}
              totalVotes={card.totalVotes}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowVotingWorks;
