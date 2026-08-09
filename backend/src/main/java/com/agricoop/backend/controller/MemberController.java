package com.agricoop.backend.controller;

import com.agricoop.backend.entity.Member;
import com.agricoop.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        return memberRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member memberDetails) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setMemberIdStr(memberDetails.getMemberIdStr());
                    member.setVillage(memberDetails.getVillage());
                    member.setLandHolding(memberDetails.getLandHolding());
                    member.setShareCapital(memberDetails.getShareCapital());
                    member.setStatus(memberDetails.getStatus());
                    return ResponseEntity.ok(memberRepository.save(member));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        return memberRepository.findById(id)
                .map(member -> {
                    memberRepository.delete(member);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
