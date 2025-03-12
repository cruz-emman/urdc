import React from 'react'
import ClientHeader from "@/components/client-header"
import { Card, CardContent} from "@/components/ui/card"
import Image from "next/image"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const aboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-white" >
        <ClientHeader />

        <h1 className='pt-8 text-4xl font-bold flex justify-center m-4 font-serif text-green-900'>UNIVERSITY RESEARCH AND DEVELOPMENT CENTER</h1>
        {/*Content*/}
        <section className='py-2 flex justify-center m-4 w-full max-w-[800px] mx-auto'>

            <Tabs defaultValue='intro'>
                <TabsList>
                    <TabsTrigger value="intro">Introduction</TabsTrigger>
                    <TabsTrigger value="researchAgenda">Research Agenda</TabsTrigger>
                    <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                </TabsList>
                
                <TabsContent value="intro">
                    <Card>
                        <CardContent className="space-y-3 text-justify">
                            <div className="flex justify-center w-full m-2 pt-4">
                                <Image src="/URDC_Intro.png" alt="URDC Introduction" width={800} height={600} />
                            </div>

                            <p className="mb-4">
                                The <b>University Research and Development Center</b>  (URDC) 
                                formulates and implements effective mechanisms for planning, 
                                directing, supervising, financing, monitoring, disseminating, 
                                and assessing research and development activities of the University. 
                                It is also geared towards the establishment of linkages and the 
                                promotion of collaborative research activities with research-based 
                                and other academic institutions.
                            </p>

                            <p className="mb-4">
                                It develops a pool of faculty researchers and research specialists 
                                by providing them with a continuing program of upgrading human resource 
                                capabilities in research through effective training programs and attractive 
                                incentives to researchers. It also develops and implements guidelines that
                                shall ensure the nurturance of a strong research culture in the University,
                                and generates quality research outputs for utilization of the academe and 
                                the community.
                            </p>

                            <p className='font-bold text-2xl text-green-900'>Vision</p>
                            <p>
                                A strong and dynamic research culture which is highly responsive in effecting quality 
                                Christian education and service through an enhanced discovery of knowledge.
                            </p>

                            <p className='font-bold text-2xl text-green-900'>Mission</p>
                            <p>
                                Adopt a holistic approach in providing an efficient and effective exercise 
                                of research anchored on the following elements: Christian-based and interdisciplinary 
                                in approach, development oriented, innovative, and Filipino in character yet global 
                                in perspective.
                            </p>

                            <Accordion type="multiple" defaultValue={["director"]}>
                                <AccordionItem value="director">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">Director</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-row justify-center w-full">
                                        <div className="flex-grow-0 flex-shrink-0 basis-1/5 w-full flex justify-center items-center">
                                            <Image src="/drMariaAntonia.png" alt="URDC Director" width={75} height={75} />
                                        </div>

                                        <div className="flex-grow-0 flex-shrink-0 basis-4/5 w-full">
                                            <p className='font-bold'>DR. MARIA ANTONIA C. CAPILI</p>
                                            <p>Contact Information: 7022882 loc. 631</p>
                                            <p>Office Location: 3rd Floor, Anne Keim Barsam Hall</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="urdcPublications">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">URDC Publications</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ul className="list-disc pl-5 underline">
                                            <li> <Link href="https://www.tua.edu.ph/urdc-research-manual/">URDC Research Manual</Link></li>
                                            <li> <Link href="#">The Trinitian Researcher</Link></li>
                                        </ul>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="forms">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">Forms</AccordionTrigger>
                                <AccordionContent>
                                <div className="flex w-full">
                                        <ul className="list-disc pl-5 underline">
                                            <li> <Link href="https://www.tua.edu.ph/downloads/guide.pdf">Concept Paper Guide Form</Link></li>
                                        </ul>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>
                                
                            </Accordion>

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="researchAgenda">
                    <Card>
                        <CardContent className="space-y-3 text-justify w-[800px]">

                            <Accordion type="multiple" defaultValue={["researchPriorities", "researchAgenda"]}>
                                <AccordionItem value="researchAgenda">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">Research Agenda</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ol className='list-decimal pl-5'>
                                            <li> Link research with practice.</li>
                                            <li>Build and enhance the research capability of the University 
                                                through human and physical resource development as a way of 
                                                creating an environment that fosters research.</li>
                                            <li>Establish linkages between/among families, schools, 
                                                community groups and the corporate world.</li>
                                            <li>
                                            Develop a re-orientation in beliefs that education is a 
                                            community-wide rather than a school-based activity.</li>
                                        </ol>
                                    </div>

                                </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="researchPriorities">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">A. Research Thrust and Priorities:  (URDC Research Manual)</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full flex-col">
                                    <ol className='list-decimal pl-5'>
                                            <li>Program/Curriculum Enhancement</li>
                                            <li>Institution-Building</li>
                                            <li>Health and Health-Related Researches (including alternative medicine)</li>
                                            <li>Integrative Theories, Models or Philosophy</li>
                                            <li>Teacher Education</li>
                                            <li>Policy-oriented Studies</li> 
                                            <li>Christian Education, Values and other Related Advocacies</li>
                                            <li>Business and Industry</li>
                                            <li>Intercultural Studies</li>
                                            <li>Service-learning</li>
                                            <li>Peace and Security</li>
                                            <li>People Empowerment</li>
                                        </ol>
                                        <p className="text-gray-500 pt-5">Note:  From  URDC Research Manual</p>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="researchPrioritiesB">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">B. Research Priorities from NEHRA 2  2009-2018</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ol className='list-decimal pl-5'>
                                            <li>Basic research to generate new knowledge and advance the frontiers in the various disciplines</li>
                                            <li>Research in aid of policy/plan formulation and implementation particularly in education</li>
                                            <li>Research aimed at producing/adapting education technologies and developing education programs in cutting edge 
                                                fields such as nanotechnology, biotechnology, ICT, materials science, etc.</li>
                                            <li>R & D in aid of national/regional development</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>    

                                <AccordionItem value="priorityAreas">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">Priority Areas in Education and Education Management</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ol className='list-decimal pl-5'>
                                            <li> Program/Curricular Studies on Higher Education</li>
                                            <li>Policy Oriented Studies
                                                <ol className='list-decimal pl-5'>
                                                    <li>Financing of higher education; cost sharing in higher education</li>
                                                    <li>Economics of higher education</li>
                                                    <li>Governance and management of higher education</li>
                                                    <li>Accreditation and other quality assurance mechanisms</li>
                                                    <li>Rationalization of higher education</li>
                                                    <li>Internationalization of higher education</li>
                                                    <li>Access and equity measures</li>
                                                    <li>Student financing models</li>
                                                    <li>Research on Quality and Standards in the context of
                                                        <ol className='list-decimal pl-5'>
                                                            <li>International rankings and global benchmarding</li>
                                                            <li>Quality Assurance Systems</li>
                                                            <li>Equivalency</li>
                                                            <li>Redefining Classifications of HEIs</li>
                                                            <li>Technology and Education</li>
                                                            <li>Model Building Studies</li>
                                                            <li>Institutional Development Studies</li>
                                                            <li>Graduate Tracer Studies</li>   
                                                        </ol>
                                                    </li>
                        
                                                </ol>
                                            </li>
                                            
                                        </ol>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>    

                                <AccordionItem value="priorityThemes">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">Priority Themes for Multidisciplinary/Multisectoral Research</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ol className='list-decimal pl-5'>
                                            <li>Food Safety and Security</li>
                                            <li>Enhancing Indigenous Renewable Energy Source in the Domestic Energy Mix</li>
                                            <li>Development of Vaccines and Diagnostic Kits using Indigenous Materials</li>
                                            <li>Disaster Risk Management</li>
                                            <li>Pollution Control</li>
                                            <li>Climate Change specifically on the Issue of Global warming</li>
                                            <li>Future ASEAN</li>
                                            <li>Peace Process and Conflict Resolution</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>    

                                <AccordionItem value="researchPrioritiesC">
                                <AccordionTrigger className="font-bold text-green-900 text-xl">B. Research Priorities from NEHRA 2  2009-2018</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex w-full">
                                        <ol className='list-decimal pl-5'>
                                            <li>Diagnostics</li>
                                            <li>Genomic Molecular Technology</li>
                                            <li>Drug Discovery and Development</li>
                                            <li>Functional Foods</li>
                                            <li>Hospital Equipment and Biomedical Devices</li>
                                            <li>Information and Communication Technology for Health</li>
                                            <li>Financial Risk Protection</li>
                                            <li>Improving Access to quality Hospital and Health Care Facilities</li>
                                            <li>Improving Provisions of Public Health Services</li>
                                            <li>Environmental and Climate Change</li>
                                            <li>Health Social Sciences</li>
                                        </ol>
                                    </div>
                                </AccordionContent>
                                </AccordionItem>    
                                
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="guidelines">
                    <Card>
                        <CardContent className="space-y-3 text-justify w-[800px]">
                            <p className='font-bold text-2xl text-green-900 pt-4'>
                                Guidelines in Writing Research Articles for Publication
                            </p>

                            <p>
                                One way of disseminating research studies is through publication in 
                                research journal either local or international. Researchers who intend 
                                to publish their articles in refereed journals have to follow the format 
                                prescribed by the publications aimed at. However, the following guidelines 
                                can guide researchers in transforming their research in publishable form:
                            </p>

                            <p className='font-bold text-green-900 text-xl'>In terms of format, the following parts usually appear:</p>
                            <ol className='list-decimal pl-5'>
                                <li>
                                    <span className="font-bold text-green-900">Title Page -</span> This is the first page that appears in the research report
                                    with the following information: the title of the work, 
                                    the author/s and other relevant information. The title page is not 
                                    numbered.
                                </li>
                                <li> 
                                    <span className="font-bold text-green-900">Abstract -</span> The abstract provides readers with brief and concise 
                                    information on the salient features of the study. It gives the
                                    reader an overview of why and how the study was conducted and
                                    includes the significant finding of the research.
                                </li>
                                <li>
                                    <span className="font-bold text-green-900">Main Body to include the:</span>
                                    <ol className='list-disc pl-5'>
                                        <li>
                                            <span className="font-bold text-green-900">Introduction -</span> It is a brief presentation of the purpose and significance of the study.
                                        </li>
                                        <li>
                                            <span className="font-bold text-green-900">Research Paradigm -</span> It is where the set of assumptions, concepts, values and 
                                            practices supporting the study are presented.
                                        </li>
                                        <li>
                                            <span className="font-bold text-green-900">Method -</span> It is a brief discussion of how the sample groups were selected; 
                                            how the data were collected/generated and analyzed. Results from the data gathered 
                                            from the survey questionnaire might not be the same with the results from the interview;
                                             the researcher should explain clearly the differences between coding and tabulating,
                                              interpreting and analyzing. A good discussion of the method is important for other 
                                              researchers to adapt or replicate the methodology used. Sufficient information must 
                                              be given to allow others to replicate the work. This is particularly the case when a
                                               new method had been developed. The reader must know if the method is appropriate to
                                                the objectives of the study.
                                        </li>
                                        <li>
                                            <span className="font-bold text-green-900">Results and Discussions -</span> This includes presentation and analysis of research findings.
                                            Results must be presented following the order of the problems/objectives raised in the
                                            early part of the paper.
                                        </li>

                                    </ol>
                                </li>
                                <li>
                                    <span className="font-bold text-green-900">Reference -</span> This section indicates the source of all information and ideas from existing
                                    work use in writing the research report. All information that is not referenced is 
                                    assumed to be general knowledge or come directly from the researcher.
                                </li>
                            </ol>

                            <p>In terms of presentation, the APA format is suggested (download from the following: 
                                http://webster.commnet.edu/apa/; http://owl.english.purdue.edu/owl/resource/560/01; 
                                http://www.uwsp.edu/PSYCH/apa4b.htm). In addition, the following may also be considered:</p>
                            <ol className='list-decimal pl-5'>
                                <li>
                                    The report must be typed, double-spaced on standard paper (8.5” x 11” with 1” margin on 
                                    both sides of the paper, 10-13 pt. Times New Roman font or a similar form. This must be 
                                    followed throughout the paper.
                                </li>
                                <li>
                                    The title itself must be typed in uppercase and lowercase letters, centered on the page.
                                </li>
                                <li>
                                    Within the text, paragraphs must be indented five to seven spaces (except for entries 
                                    in the reference list, block quotations and abstract.
                                </li>
                            </ol>
                            <p className='text-gray-500'>Source: E-mail from Dr. Libertad Garcia of the Commission on Higher Education (CHED) dated July 21, 2009.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </section>
    </div>
  )
}

export default aboutUs