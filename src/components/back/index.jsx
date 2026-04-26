import {
  BackWrapper,
  Blob1,
  Blob2,
  Blob3,
  Content,
  BrandRow,
  BrandDot,
  BrandName,
  HeroSection,
  HeroTitle,
  HeroHighlight,
  HeroSub,
  StatsRow,
  StatItem,
  StatNum,
  StatLabel,
} from "./styles";

function Back() {
  return (
    <BackWrapper>
      <Blob1 />
      <Blob2 />
      <Blob3 />

      <Content>
        <BrandRow>
          <BrandDot />
          <BrandName>Testify</BrandName>
        </BrandRow>

        <HeroSection>
          <HeroTitle>
            Stop fighting your <HeroHighlight>E2E tests</HeroHighlight>.
          </HeroTitle>
          <HeroSub>
            Testing shouldn't be a chore. Automate your flows and catch bugs
            without the manual struggle.
          </HeroSub>
        </HeroSection>

        <StatsRow>
          <StatItem>
            <StatNum>50+</StatNum>
            <StatLabel>Scans</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>2k+</StatNum>
            <StatLabel>Nodes analyzed</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>200+</StatNum>
            <StatLabel>Vulnerabilities detected</StatLabel>
          </StatItem>
        </StatsRow>
      </Content>
    </BackWrapper>
  );
}

export default Back;
