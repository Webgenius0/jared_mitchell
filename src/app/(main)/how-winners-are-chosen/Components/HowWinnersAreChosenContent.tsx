import Link from "next/link";
import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { FiCheckCircle, FiTarget, FiEye, FiBookOpen } from "react-icons/fi";

const HowWinnersAreChosenContent = () => {
  return (
    <>
      {/* 1. Community decision section */}
      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">
              The Community Is Part of the Decision
            </h2>
            <p className="section_sub_title">
              The people who live, work, shop, and invest in the community
              understand which businesses are making a meaningful difference.
              That is why community participation is at the center of the OSI
              Top Business Award.
            </p>
          </div>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto text-center px-2">
            During each challenge, contestants submit material that allows the
            public to learn about their businesses — not just their logos or
            popularity. Community members watch the submissions, consider the
            published criteria, and vote for the businesses they believe have
            demonstrated the strongest potential, commitment, and impact.
          </p>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto mt-5 md:mt-6 text-center px-2">
            Every vote helps a local business gain something valuable:
            attention, credibility, feedback, new supporters, and an
            opportunity to reach people who may not have discovered it
            otherwise.
          </p>
        </Container>
      </section>

      {/* 2. Simple voting summary */}
      <section className="section bg-[#F5F5F5]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">Watch. Learn. Support. Vote.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <VotingStep
              Icon={FiEye}
              title="Watch the Submissions"
              description="Review the videos, business pitches, customer-experience presentations, and supporting material submitted by each contestant."
            />
            <VotingStep
              Icon={FiBookOpen}
              title="Learn About the Businesses"
              description="Look beyond the business name. Learn about the owner, the problem the business solves, the customers it serves, and the progress it is working to create."
            />
            <VotingStep
              Icon={FiTarget}
              title="Consider the Criteria"
              description="Evaluate contestants according to the purpose of the current challenge — not simply personal relationships, follower counts, or popularity."
            />
            <VotingStep
              Icon={FiCheckCircle}
              title="Cast Your Vote"
              description="Support the business you believe delivered the strongest submission and demonstrated the greatest potential to grow and positively affect the community."
            />
          </div>
        </Container>
      </section>

      {/* 3. What voters should consider */}
      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">What Makes a Strong Submission?</h2>
            <p className="section_sub_title">
              When reviewing contestants, community members should consider:
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left max-w-3xl mx-auto px-2">
            <ConsiderItem text="Did the owner clearly explain the business and its purpose?" />
            <ConsiderItem text="Does the business solve a real problem or meet a real need?" />
            <ConsiderItem text="Did the contestant follow the challenge requirements?" />
            <ConsiderItem text="Does the business provide a positive customer experience?" />
            <ConsiderItem text="Has the owner demonstrated commitment, progress, and professionalism?" />
            <ConsiderItem text="Could greater visibility and support help the business reach its next level?" />
            <ConsiderItem text="Does the business have the potential to contribute positively to its customers or community?" />
          </ul>

          <p className="mt-6 md:mt-8 text-center text-base md:text-lg text-secondary-black leading-relaxed max-w-3xl mx-auto px-2">
            The goal is not to choose the contestant with the most friends or
            followers. The goal is to recognize the business that best responds
            to each challenge and demonstrates that it is prepared to make
            meaningful use of the opportunity.
          </p>
        </Container>
      </section>

      {/* 4. How advancement works */}
      <section className="section bg-[#F5F5F5]">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">How Businesses Advance</h2>
            <p className="section_sub_title">
              The detailed requirements for each challenge are explained on the
              competition stages page. This page only needs the following
              summary:
            </p>
          </div>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto text-center px-2">
            During the first four rounds, contestants advance based on the
            community’s response to the material submitted for that challenge.
            Voting opens and closes on the dates published for each round, and
            only eligible votes submitted during that period are counted.
          </p>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto mt-5 md:mt-6 text-center px-2">
            As the competition progresses, contestants are asked to reveal more
            about their stories, business models, customer experiences,
            community impact, and plans for growth.
          </p>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto mt-5 md:mt-6 text-center px-2">
            This structure allows the community to follow each business over
            time — not simply make a decision after seeing one advertisement or
            short introduction.
          </p>

          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="#stages">
                View the Five Competition Stages
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 5. Final-round decision */}
      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">
              The Final Decision Combines Community Voice and OSI Review
            </h2>
          </div>

          {/* Weighting highlight card */}
          <div className="max-w-3xl mx-auto bg-primary-black text-white rounded-2xl p-5 md:p-7 lg:p-9 mb-6 md:mb-8">
            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-balance mb-5">
              The final winner is selected using a combination of community
              voting and an OSI panel evaluation. The community vote represents
              70% of the final result, while the OSI panel score represents 30%.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold">70%</p>
                <p className="text-sm md:text-base text-white/80 mt-1">
                  Community Vote
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold">30%</p>
                <p className="text-sm md:text-base text-white/80 mt-1">
                  OSI Panel Score
                </p>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto text-center px-2">
            The OSI panel evaluates each finalist using the same published
            standards:
          </p>

          <ul className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-left max-w-3xl mx-auto px-2 text-sm md:text-base text-secondary-black">
            <p className="pb-2 md:pb-3">• Strength and clarity of the business</p>
            <p className="pb-2 md:pb-3">• Quality of the final presentation</p>
            <p className="pb-2 md:pb-3">• Customer experience</p>
            <p className="pb-2 md:pb-3">• Evidence of progress and commitment</p>
            <p className="pb-2 md:pb-3">• Community value or potential impact</p>
            <p className="pb-2 md:pb-3">• Realistic use of the award, resources, and exposure</p>
          </ul>

          <p className="mt-5 md:mt-6 text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto text-center px-2">
            The voting period, judging criteria, scoring method, tie procedure,
            and winner-announcement date will be published before the final
            round begins.
          </p>
        </Container>
      </section>

      {/* 6. Purpose of the competition */}
      <section className="section bg-[#F5F5F5]">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">Every Round Creates an Opportunity</h2>
            <p className="section_sub_title">
              The OSI Top Business Award is designed to create benefits before a
              winner is announced. Each challenge gives participating businesses
              another reason to tell their stories, showcase their work, connect
              with potential customers, and strengthen their public presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <BenefitCard
              title="Build Community Support"
              description="Give people a direct way to discover, encourage, share, and support local business owners."
            />
            <BenefitCard
              title="Increase Business Awareness"
              description="Introduce participating businesses to potential customers, partners, sponsors, and supporters who may not have known they existed."
            />
            <BenefitCard
              title="Create Marketing Opportunities"
              description="Turn challenge submissions into useful stories, videos, presentations, and promotional material that can continue building visibility."
            />
            <BenefitCard
              title="Strengthen the Local Business Community"
              description="Encourage residents, organizations, and businesses to participate in one another’s progress instead of allowing entrepreneurs to build in isolation."
            />
          </div>
        </Container>
      </section>

      {/* 7. Attention-drawing statement */}
      <section className="py-10 md:py-14 lg:py-18 xl:py-24">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-primary-black font-semibold leading-[140%] mb-4 md:mb-6 px-2">
              A vote may take only a moment — but the attention it creates can
              help change the direction of a small business.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-secondary-black leading-relaxed max-w-3xl mx-auto px-2">
              When the community watches, shares, discusses, and supports a
              contestant, that business gains more than points. It gains
              visibility, confidence, potential customers, stronger
              relationships, and proof that people believe its work deserves to
              be seen.
            </p>

            <p className="mt-5 md:mt-6 text-base md:text-lg lg:text-xl text-secondary-black leading-relaxed max-w-3xl mx-auto px-2">
              This is what makes the OSI Top Business Award different: the
              competition is not only about selecting one winner. It is about
              building a larger community around local businesses and creating
              opportunities for every serious contestant to leave with greater
              awareness than they had when they entered.
            </p>
          </div>
        </Container>
      </section>

      {/* 8. Voting-integrity section */}
      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10 xl:mb-14">
            <h2 className="section_title">
              A Fair and Transparent Voting Process
            </h2>
          </div>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto text-center px-2">
            OSI will publish the voting dates, eligibility requirements,
            challenge criteria, finalist-selection method, and final scoring
            formula before voting begins.
          </p>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto mt-5 md:mt-6 text-center px-2">
            Votes may be reviewed or removed when there is evidence of automated
            activity, duplicate accounts, manipulation, false information,
            harassment, or another violation of the official rules.
          </p>

          <p className="text-base md:text-lg text-secondary-black leading-relaxed max-w-4xl mx-auto mt-5 md:mt-6 text-center px-2">
            Contestants may promote their entries and encourage legitimate
            community participation, but no contestant may interfere with
            another entry or misrepresent how the competition works.
          </p>
        </Container>
      </section>
    </>
  );
};

function VotingStep({
  Icon,
  title,
  description,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-8 custom_border custom_shadow">
      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary-blue/10 flex items-center justify-center mb-4 md:mb-5">
        <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary-blue" />
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-black mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-secondary-black leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ConsiderItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 md:gap-4">
      <FiCheckCircle className="mt-0.5 size-4 md:size-5 text-primary-blue shrink-0" />
      <p className="text-sm md:text-base text-secondary-black leading-relaxed">
        {text}
      </p>
    </li>
  );
}

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-8 custom_border custom_shadow">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-black mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-secondary-black leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default HowWinnersAreChosenContent;
