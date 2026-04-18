import * as React from "react";

interface ApplicationEmailProps {
  logoUrl: string;
  fullName: string;
  dateOfBirth: string;
  fathersName: string;
  familyName: string;
  quartersInNomeh: string;
  phone: string;
  residentialAddress: string;
  city: string;
  stateOfResidence: string;
  occupation: string;
  submittedAt: string;
}

export function ApplicationEmail({
  logoUrl,
  fullName,
  dateOfBirth,
  fathersName,
  familyName,
  quartersInNomeh,
  phone,
  residentialAddress,
  city,
  stateOfResidence,
  occupation,
  submittedAt,
}: ApplicationEmailProps) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Membership Application – LikeMinds 1980–1986</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f4f4f0",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Wrapper */}
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#f4f4f0", padding: "40px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: "600px",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* ── Header ── */}
                  <tbody>
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 60%, #1a3a2a 100%)",
                          padding: "40px 40px 32px",
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        {/* Gold top rule */}
                        <div
                          style={{
                            height: "3px",
                            background:
                              "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                            marginBottom: "28px",
                            borderRadius: "2px",
                          }}
                        />

                        {/* Logo */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoUrl}
                          alt="LikeMinds Logo"
                          width={72}
                          height={72}
                          style={{
                            display: "block",
                            margin: "0 auto 20px",
                            borderRadius: "50%",
                            border: "2px solid #c9a84c",
                            objectFit: "cover",
                          }}
                        />

                        <h1
                          style={{
                            margin: 0,
                            color: "#ffffff",
                            fontSize: "22px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                          }}
                        >
                          LikeMinds 1980–1986
                        </h1>
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "rgba(255,255,255,0.55)",
                            fontSize: "10px",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                          }}
                        >
                          Age Grade · Nomeh Unateze
                        </p>

                        {/* Gold bottom rule */}
                        <div
                          style={{
                            height: "1px",
                            background:
                              "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
                            marginTop: "28px",
                          }}
                        />
                      </td>
                    </tr>

                    {/* ── Alert Banner ── */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#c9a84c",
                          padding: "14px 40px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "#1a3a2a",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          📋 New Membership Application Received
                        </p>
                      </td>
                    </tr>

                    {/* ── Body ── */}
                    <tr>
                      <td style={{ padding: "36px 40px 0" }}>
                        <p
                          style={{
                            margin: "0 0 28px",
                            color: "#444",
                            fontSize: "14px",
                            lineHeight: "1.7",
                          }}
                        >
                          A new membership application has been submitted on{" "}
                          <strong style={{ color: "#1a3a2a" }}>{submittedAt}</strong>.
                          Please review the details below and take the appropriate action.
                        </p>

                        {/* ── Section: Personal Details ── */}
                        <SectionHeader title="Personal Details" icon="👤" />
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ marginBottom: "24px" }}
                        >
                          <tbody>
                            <Row label="Full Name" value={fullName} highlight />
                            <Row label="Date of Birth" value={dateOfBirth} />
                            <Row label="Father's Name" value={fathersName} />
                            <Row label="Family / Umunna" value={familyName} />
                            <Row label="Quarters in Nomeh" value={quartersInNomeh} />
                          </tbody>
                        </table>

                        {/* ── Section: Contact & Work ── */}
                        <SectionHeader title="Contact & Work" icon="📞" />
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ marginBottom: "24px" }}
                        >
                          <tbody>
                            <Row label="Phone Number" value={phone} />
                            <Row
                              label="Residential Address"
                              value={`${residentialAddress}, ${city}, ${stateOfResidence}`}
                            />
                            <Row label="Occupation" value={occupation} />
                          </tbody>
                        </table>

                        {/* ── Declaration notice ── */}
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ marginBottom: "32px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#f0f7f2",
                                  border: "1px solid #b8ddc8",
                                  borderRadius: "8px",
                                  padding: "16px 20px",
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0 0 6px",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: "#1a3a2a",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                  }}
                                >
                                  ✅ Declaration Confirmed
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "13px",
                                    color: "#555",
                                    lineHeight: "1.6",
                                  }}
                                >
                                  The applicant has confirmed all eligibility criteria and signed the
                                  solemn declaration, including acknowledgment of the{" "}
                                  <strong>₦100,000 one-time registration fee</strong>.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* ── CTA ── */}
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ marginBottom: "36px" }}
                        >
                          <tbody>
                            <tr>
                              <td align="center">
                                <a
                                  href="mailto:info@likemindsofficial.org"
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: "#1a3a2a",
                                    color: "#c9a84c",
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    padding: "14px 36px",
                                    borderRadius: "6px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Review &amp; Respond to Applicant →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── Motto band ── */}
                    <tr>
                      <td
                        style={{
                          background:
                            "linear-gradient(90deg, #1a3a2a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                          padding: "18px 40px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "#c9a84c",
                            fontSize: "15px",
                            fontStyle: "italic",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                          }}
                        >
                          &ldquo;Ofu Obi Umunwanne&rdquo;
                        </p>
                      </td>
                    </tr>

                    {/* ── Footer ── */}
                    <tr>
                      <td
                        style={{
                          padding: "24px 40px",
                          backgroundColor: "#f9f9f7",
                          borderTop: "1px solid #e8e8e0",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: "11px",
                            color: "#999",
                            letterSpacing: "0.5px",
                          }}
                        >
                          LikeMinds 1980–1986 Association · Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria
                        </p>
                        <p style={{ margin: 0, fontSize: "11px", color: "#bbb" }}>
                          This email was automatically generated from the membership application form.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

// ── Sub-components ────────────────────────────────────────

function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "10px" }}>
      <tbody>
        <tr>
          <td
            style={{
              borderBottom: "2px solid #c9a84c",
              paddingBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#1a3a2a",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {icon}&nbsp;&nbsp;{title}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <tr>
      <td
        width="38%"
        style={{
          padding: "9px 12px 9px 0",
          fontSize: "12px",
          color: "#888",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          verticalAlign: "top",
          borderBottom: "1px solid #f0f0ec",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "9px 0",
          fontSize: "14px",
          color: highlight ? "#1a3a2a" : "#333",
          fontWeight: highlight ? 700 : 400,
          verticalAlign: "top",
          borderBottom: "1px solid #f0f0ec",
        }}
      >
        {value}
      </td>
    </tr>
  );
}
