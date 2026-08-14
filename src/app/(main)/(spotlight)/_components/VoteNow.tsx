import Container from "@/Components/Common/Container";

const VoteNow = () => {
  // No live Final 6 data source on these pages — show an empty state instead
  // of fabricated performers.
  return (
    <section className="pb-24">
      <Container>
        <div className="py-[52px] px-[54px] space-y-[44px] bg-secondary-gray rounded-2xl custom_border custom_shadow">
          <div>
            <h2 className="section_title !text-left 2xl:!text-6xl">
              Final 6 — Vote Now
            </h2>
            <p className="section_sub_title !text-left">
              Top performers from last week's Top 12. Winner becomes next
              Spotlight of the Week.
            </p>
          </div>
          <div className="rounded-2xl bg-white custom_border custom_shadow p-10 text-center">
            <p className="text-secondary-black text-lg md:text-xl">
              No contestants available for voting yet. Check back once voting
              opens.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VoteNow;
